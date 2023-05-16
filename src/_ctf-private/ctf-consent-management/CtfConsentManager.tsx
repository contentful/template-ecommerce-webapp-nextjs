import { Button } from '@chakra-ui/react';
import {
  ConsentDrawerAction,
  injectOsanoGlobalStyles,
} from '@contentful/experience-consent-manager';
import { useTranslation } from 'next-i18next';

import { useCtfConsent } from './useCtfConsent';

injectOsanoGlobalStyles();

export const CtfConsentManager = () => {
  const { t } = useTranslation();

  const { data: consentManager } = useCtfConsent();

  return consentManager ? (
    <ConsentDrawerAction
      consentManager={consentManager}
      renderAction={({ openDrawer, disabled }) => (
          <Button
            onClick={openDrawer}
            disabled={disabled}
            variant="unstyled"
            size="xs"
            whiteSpace="normal"
            textAlign={{ base: 'left', md: 'center' }}>
            {t('common.manageConsent')}
          </Button>
      )}
    />
  ) : null;
};
