import tokens from '@contentful/f36-tokens';
import styled from '@emotion/styled';
import Link from 'next/link';

import Logo from '@src/icons/bonelli.svg';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${tokens.colorWhite};
`;

export const Header = () => {
  return (
    <Nav>
      <Link href="/">
        <Logo />
      </Link>
      <p>Translate</p>
    </Nav>
  );
};
