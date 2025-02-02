import { memo } from 'react';
import styled from 'styled-components';
import useIsAuthenticated from 'contexts/auth/useIsAuthenticated';
import breakpoints, { pageGutter } from 'components/core/breakpoints';
import { GLOBAL_NAVBAR_HEIGHT } from '../constants';
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';

function GlobalNavbar() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <StyledGlobalNavbar data-testid="navbar">
      {isAuthenticated ? <LoggedInNav /> : <LoggedOutNav />}
    </StyledGlobalNavbar>
  );
}

const StyledGlobalNavbar = styled.div`
  width: 100%;
  height: ${GLOBAL_NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: flex-end;

  position: relative;
  z-index: 3;

  padding: 0 ${pageGutter.mobile}px;

  @media only screen and ${breakpoints.tablet} {
    padding: 0 ${pageGutter.tablet}px;
  }
`;

export default memo(GlobalNavbar);
