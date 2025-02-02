import styled, { css } from 'styled-components';
import breakpoints, { pageGutter } from 'components/core/breakpoints';
import { Caption, TitleSerif } from 'components/core/Text/Text';
import Spacer from 'components/core/Spacer/Spacer';
import colors from 'components/core/colors';
import transitions from 'components/core/transitions';
import { GLOBAL_FOOTER_HEIGHT, GLOBAL_FOOTER_HEIGHT_MOBILE } from './constants';
import {
  GALLERY_FAQ,
  GALLERY_JOBS,
  GALLERY_DISCORD,
  GALLERY_MEMBERSHIP_OPENSEA,
  GALLERY_TWITTER,
  GALLERY_BLOG,
} from 'constants/urls';
import { useIsMobileWindowWidth } from 'hooks/useWindowSize';
import Link from 'next/link';

type GlobalFooterProps = { isFixed?: boolean };

function GlobalFooter({ isFixed = false }: GlobalFooterProps) {
  const isMobile = useIsMobileWindowWidth();

  return (
    <StyledGlobalFooter isFixed={isFixed} isMobile={isMobile}>
      {isMobile && <StyledHr />}
      <MainContent>
        <Link href="/">
          <StyledLogo>GALLERY</StyledLogo>
        </Link>
        <Spacer height={isMobile ? 16 : 4} />
        <StyledLinkContainer>
          <StyledLink href={GALLERY_FAQ} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>FAQ</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
          <StyledLink href={GALLERY_TWITTER} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>Twitter</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
          <StyledLink href={GALLERY_DISCORD} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>Discord</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
          <StyledLink href={GALLERY_BLOG} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>Blog</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
          <StyledLink href={GALLERY_MEMBERSHIP_OPENSEA} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>OpenSea</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
          <StyledLink href={GALLERY_JOBS} target="_blank" rel="noreferrer">
            <StyledLinkText color={colors.gray30}>Jobs</StyledLinkText>
          </StyledLink>
          <Spacer width={8} />
        </StyledLinkContainer>
      </MainContent>
      {isMobile && <Spacer height={4} />}
      <BoringLegalContent>
        <Caption color={colors.gray50}>© {new Date().getFullYear()} All rights reserved</Caption>
        <Spacer width={8} />
        <Caption color={colors.gray50}>·</Caption>
        <Spacer width={8} />
        <StyledLink href="/privacy">
          <StyledLinkText color={colors.gray30}>Privacy</StyledLinkText>
        </StyledLink>
        <Spacer width={8} />
        <StyledLink href="/terms">
          <StyledLinkText color={colors.gray30}>Terms</StyledLinkText>
        </StyledLink>
      </BoringLegalContent>
    </StyledGlobalFooter>
  );
}

type StyledFooterProps = {
  isFixed: boolean;
  isMobile: boolean;
};

const StyledGlobalFooter = styled.div<StyledFooterProps>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? 'inherit' : 'flex-end')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};

  height: ${({ isMobile }) => `${isMobile ? GLOBAL_FOOTER_HEIGHT_MOBILE : GLOBAL_FOOTER_HEIGHT}px`};
  padding: 0 ${pageGutter.mobile}px 24px;

  background-color: white;
  z-index: 2;
  position: relative;
}

  @media only screen and ${breakpoints.tablet} {
    padding: 0 ${pageGutter.tablet}px 24px;

    ${({ isFixed }) =>
      isFixed &&
      css`
        z-index: 2;
        position: fixed;
        bottom: 0;
        width: 100%;

        background: white;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 50%
        );
      `}
  }

  @media only screen and ${breakpoints.desktop} {
    padding: 0 32px 24px;
  }
`;

const MainContent = styled.div``;

const StyledHr = styled.hr`
  border: 1px solid #f7f7f7;
  width: 100%;
  margin: 16px 0px;
`;

const BoringLegalContent = styled.div`
  display: flex;
`;

const StyledLogo = styled(TitleSerif)`
  font-size: 24px;
  cursor: pointer;
`;

const StyledLinkContainer = styled.div`
  display: flex;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const StyledLinkText = styled(Caption)`
  transition: color ${transitions.cubic};
  &:hover {
    color: ${colors.black};
  }
`;

export default GlobalFooter;
