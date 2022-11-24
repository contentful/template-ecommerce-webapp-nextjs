/** @jsxImportSource @emotion/react */
import tokens from '@contentful/f36-tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Logo from '@icons/bonelli.svg';
import { LanguageSelector } from '@src/components/features/LanguageSelector';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${tokens.colorWhite};
  padding: ${tokens.spacingM} ${tokens.spacingL};
`;

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Nav>
      <Link href="/" title={t('common.homepage')}>
        <Logo
          css={css`
            margin-top: 6px;
          `}
          title={t('common.logoImageAltText')}
        />
      </Link>
      <LanguageSelector />
    </Nav>
  );
};
