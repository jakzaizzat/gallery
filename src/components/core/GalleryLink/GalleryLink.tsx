import { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  underlined?: boolean;
  underlineOnHover?: boolean;
};

export default function GalleryLink({
  to,
  href,
  children,
  underlined = true,
  underlineOnHover = false,
}: Props) {
  if (!to && !href) {
    console.error('no link provided for GalleryLink');
  }

  if (to) {
    return (
      <StyledLink href={to} $underlined={underlined} $underlineOnHover={underlineOnHover}>
        {children}
      </StyledLink>
    );
  }

  if (href) {
    return (
      <StyledAnchor
        href={href}
        target="_blank"
        $underlined={underlined}
        $underlineOnHover={underlineOnHover}
      >
        {children}
      </StyledAnchor>
    );
  }

  return null;
}

type StyledProps = {
  $underlineOnHover: boolean;
  $underlined: boolean;
};

const StyledLink = styled(Link)<StyledProps>`
  color: inherit;
  ${(props) => !props.$underlined && 'text-decoration: none'};

  &:hover {
    ${(prop) => prop.$underlineOnHover && 'text-decoration: underline'};
  }
`;

const StyledAnchor = styled.a<StyledProps>`
  color: inherit;
  ${(props) => !props.$underlined && 'text-decoration: none;'}

  &:hover {
    ${(prop) => prop.$underlineOnHover && 'text-decoration: underline'};
  }
`;
