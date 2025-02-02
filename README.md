# Gallery Frontend

The premier gallery experience for your NFTs.

## Getting Started

### Pre-requisites

1. [Install Yarn](https://classic.yarnpkg.com/en/docs/install)
2. [Install NVM](https://github.com/nvm-sh/nvm)

### Setup

Create a local .env file by copying values from .env.sample:

```terminal
$ cp .env.sample .env
```

Install our node version:

```bash
$ nvm use
```

Install dependencies:

```bash
$ yarn
```

Generate relay files

```bash
yarn relay
```

Start app:

```bash
$ yarn dev
```

The app will be available on http://localhost:3000

### Advanced

If you need access to any of the following:

- Test wallet
- Analytics keys
- Sentry keys

Hit up a member of the core team!

### Other commands

- `yarn test` for tests
- `yarn relay` to run relay compiler
- `yarn relay:watch` to run relay compiler in watch mode
- `yarn lint` for linting
- `yarn typecheck` for checking type validity
- `yarn cypress:run` to run e2e tests
- `yarn cypress:open` to open cypress
