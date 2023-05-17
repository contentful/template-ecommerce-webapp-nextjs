import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import MobileLogo from '@icons/bonelli-mobile.svg';
import DesktopLogo from '@icons/bonelli.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { LinkWithPersistedQuery } from '@src/components/shared/link-wIth-persisted-query';

export const HEADER_HEIGHT = 60;

export const Header = (props: BoxProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      align="center"
      pl={{ base: 4, md: 12, lg: 12 }}
      pr={{ base: 4, md: 12, lg: 12 }}
      height={`${HEADER_HEIGHT}px`}
      zIndex="2"
      {...props}>
      <LinkWithPersistedQuery href="/" title={t('common.homepage')}>
        <Box
          display={{ base: 'none', md: 'block', lg: 'block' }}
          as={DesktopLogo}
          title={t('common.logoImageAltText')}
        />
        <Box
          display={{ base: 'block', md: 'none', lg: 'none' }}
          as={MobileLogo}
          title={t('common.logoImageAltText')}
        />
      </LinkWithPersistedQuery>
      <LanguageSelector />
    </Flex>
  );
};
