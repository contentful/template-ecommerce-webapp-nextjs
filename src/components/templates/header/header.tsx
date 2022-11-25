import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Logo from '@icons/bonelli.svg';
import { LanguageSelector } from '@src/components/features/LanguageSelector';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Flex as="nav" justifyContent="space-between" bg="colorWhite" py={4} px={6}>
      <Link href="/" title={t('common.homepage')}>
        <Box as={Logo} mt={1.5} title={t('common.logoImageAltText')} />
      </Link>
      <LanguageSelector />
    </Flex>
  );
};
