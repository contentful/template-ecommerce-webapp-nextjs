import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Logo from '@icons/bonelli.svg';
import { LanguageSelector } from '@src/components/features/language-selector';

export const HEADER_HEIGHT = 60;

export const Header = (props: BoxProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      align="center"
      pl={12}
      pr={12}
      height={`${HEADER_HEIGHT}px`}
      zIndex="2"
      {...props}>
      <Link href="/" title={t('common.homepage')}>
        <Box as={Logo} title={t('common.logoImageAltText')} />
      </Link>
      <LanguageSelector />
    </Flex>
  );
};
