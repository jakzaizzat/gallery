import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Heading } from 'components/core/Text/Text';
import GalleryLink from 'components/core/GalleryLink/GalleryLink';
import breakpoints, { size } from 'components/core/breakpoints';
import useDebounce from 'hooks/useDebounce';
import { Directions } from 'src/components/core/enums';
import MemberListGalleryPreview from './MemberListGalleryPreview';
import detectMobileDevice from 'utils/detectMobileDevice';
import { useBreakpoint } from 'hooks/useWindowSize';
import colors from 'components/core/colors';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';
import { MemberListOwnerFragment$key } from '../../../__generated__/MemberListOwnerFragment.graphql';
import { removeNullValues } from 'utils/removeNullValues';
import { useMemberListPageActions } from 'contexts/memberListPage/MemberListPageContext';

type Props = {
  ownerRef: MemberListOwnerFragment$key;
  direction: Directions.LEFT | Directions.RIGHT;
};

function MemberListOwner({ ownerRef, direction }: Props) {
  const { setFadeUsernames } = useMemberListPageActions();

  const owner = useFragment(
    graphql`
      fragment MemberListOwnerFragment on MembershipOwner {
        user @required(action: THROW) {
          username @required(action: THROW)
        }

        previewNfts
      }
    `,
    ownerRef
  );

  // We want to debounce the isHover state to ensure we only render the preview images if the user *deliberately* hovers over the username,
  // instead of if they just momentarily hover over it when moving their cursor or scrolling down the page.

  const [startFadeOut, setStartFadeOut] = useState(false);
  // isHovering is updated immediately on mouseEnter and mouseLeave.
  const [isHovering, setIsHovering] = useState(false);
  // debounce isHovering by 150ms. so debouncedIsHovering will only be true if the user hovers over a name for at least 150ms.
  const debouncedIsHovering = useDebounce(isHovering, 150);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // If the user hovered over the name for at least 150ms, show the preview.
    if (debouncedIsHovering) {
      setShowPreview(true);
      return;
    }

    // If the user stopped hovering over the name and we are currently showing the preview, fade out the preview.
    if (!debouncedIsHovering && showPreview) {
      setStartFadeOut(true);
      // Delay hiding the preview so we the fadeout animation has time to finish.
      setTimeout(() => {
        setShowPreview(false);
        setStartFadeOut(false);
      }, 500);
    }
  }, [debouncedIsHovering, showPreview]);

  const onMouseEnter = useCallback(() => {
    setIsHovering(true);
    setFadeUsernames(true);
  }, [setFadeUsernames]);

  const onMouseLeave = useCallback(() => {
    setIsHovering(false);
    setFadeUsernames(false);
  }, [setFadeUsernames]);

  const breakpoint = useBreakpoint();

  const isDesktop = useMemo(
    () => breakpoint === size.desktop && !detectMobileDevice(),
    [breakpoint]
  );

  const previewNfts = useMemo(
    () => (owner.previewNfts ? removeNullValues(owner.previewNfts) : null),
    [owner.previewNfts]
  );

  return (
    <StyledOwner>
      <StyledUsernameWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <GalleryLink href={`/${owner.user.username}`} underlined={false}>
          <StyledUsername>{owner.user.username}</StyledUsername>
        </GalleryLink>
      </StyledUsernameWrapper>
      {isDesktop && showPreview && previewNfts && (
        <MemberListGalleryPreview
          direction={direction}
          nftUrls={previewNfts}
          startFadeOut={startFadeOut}
        />
      )}
    </StyledOwner>
  );
}

const StyledOwner = styled.div`
  width: 50%;
  flex-shrink: 0;
  display: flex;

  @media only screen and ${breakpoints.tablet} {
    width: 33%;
  }

  @media only screen and ${breakpoints.desktop} {
    width: 25%;
  }

  &:hover {
    color: ${colors.black};
  }
`;

const StyledUsernameWrapper = styled.div`
  max-width: 100%;
`;

const StyledUsername = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;
  color: inherit;
`;

export default MemberListOwner;
