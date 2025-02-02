import { useCallback } from 'react';
import RequestAction from 'hooks/api/_rest/RequestAction';
import { ApiError } from 'errors/types';
import { useAuthActions } from 'contexts/auth/AuthContext';

export const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

const ERR_UNAUTHORIZED = 401;

type RequestParameters<T> = {
  body?: T;
  headers?: Record<string, string>;
  unauthorizedErrorHandler?: () => void;
};

type GalleryErrorResponseBody = {
  error?: string;
};

export type FetcherType = <ResponseData, RequestBody = Record<string, unknown>>(
  path: string,
  action: RequestAction,
  parameters?: RequestParameters<RequestBody>
) => Promise<ResponseData>;

// Raw fetcher. If you're in a hook/component, use `useFetcher` instead.
export const _fetch: FetcherType = async (path, action, parameters = {}) => {
  const { body, headers = {}, unauthorizedErrorHandler } = parameters;

  const requestOptions: RequestInit = {
    headers,
    /**
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
     *
     * The Access-Control-Allow-Credentials response header tells browsers whether to expose the
     * response to the frontend JavaScript code when the request's credentials mode is `include`
     */
    credentials: 'include',
  };

  if (body) {
    requestOptions.method = 'POST';
    requestOptions.body = JSON.stringify(body);
  }

  let response: Response;
  if (path.includes('http')) {
    response = await fetch(path, requestOptions);
  } else {
    response = await fetch(`${baseurl}/glry/v1${path}`, requestOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const responseBody = await response.json().catch((error: unknown) => {
    // Certain successful responses won't have a JSON body (e.g. updates)
    // res.json() will throw an error in these cases, which we catch gracefully
    if (response.ok) {
      return null;
    }

    // Attach custom error message if provided
    if (action && error instanceof Error) {
      throw new ApiError(error.message, action, response.status);
    }

    throw error;
  });

  if (!response.ok) {
    if (response.status === ERR_UNAUTHORIZED) {
      unauthorizedErrorHandler?.();
    }

    // All gallery-provided error responses will have an `error` field
    const errorResponseBody = responseBody as GalleryErrorResponseBody;
    const serverErrorMessage = errorResponseBody?.error ?? 'Server Error';
    if (action) {
      throw new ApiError(serverErrorMessage, action, response.status);
    }

    throw new Error(serverErrorMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return responseBody;
};

/**
 * You should rarely use this hook directly! Instead:
 * - useGet for fetching
 * - usePost for mutations
 */
export default function useFetcher(): FetcherType {
  const { handleUnauthorized } = useAuthActions();
  return useCallback(
    async (path, action, parameters) =>
      _fetch(path, action, { ...parameters, unauthorizedErrorHandler: handleUnauthorized }),
    [handleUnauthorized]
  );
}

export const vanillaFetcher = async (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(async (res) => res.json());
