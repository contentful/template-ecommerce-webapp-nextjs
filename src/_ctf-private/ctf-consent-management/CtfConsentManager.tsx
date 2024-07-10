/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  ConsentDrawerAction,
  injectOsanoGlobalStyles,
} from '@contentful/experience-consent-manager';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

import { useCtfConsent } from './useCtfConsent';

injectOsanoGlobalStyles();

const StyledLink = styled('div')`
  color: #eeeeee;
`;

export const CtfConsentManager = () => {
  const { t } = useTranslation();

  const { data: consentManager } = useCtfConsent();

  return consentManager ? (
    <ConsentDrawerAction
      consentManager={consentManager}
      renderAction={({ openDrawer }) => (
        <StyledLink onClick={openDrawer}>{t('common.manageConsent')}</StyledLink>
      )}
    />
  ) : null;
};
