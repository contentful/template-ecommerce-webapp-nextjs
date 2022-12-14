import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { LanguageSelectorDesktop } from './LanguageSelectorDesktop';
import { LanguageSelectorMobile } from './LanguageSelectorMobile';

const localeName = locale => locale.split('-')[0];

const displayName = locale =>
  new Intl.DisplayNames([locale], {
    type: 'language',
  });

export const LanguageSelector = () => {
  const { locales } = useRouter();

  return locales && locales.length > 1 ? (
    <>
      <Box display={{ base: 'none', md: 'block', lg: 'block' }}>
        <LanguageSelectorDesktop displayName={displayName} localeName={localeName} />
      </Box>

      <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
        <LanguageSelectorMobile displayName={displayName} localeName={localeName} />
      </Box>
    </>
  ) : null;
};
