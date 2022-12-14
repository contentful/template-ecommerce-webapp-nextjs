import { Container, Box, Text, Link, useTheme } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      as="footer"
      width="full"
      py={{ base: 10, lg: 16 }}
      mt="auto"
      borderTop="1px"
      borderColor={theme.f36.gray200}>
      <Container>
        <Text mb={8}>{t('common.aboutUs')}</Text>
        <Text>{t('common.description1')}</Text>
        <Text mb={8}>{t('common.description2')}</Text>
        <Text variant="small">
          {t('common.poweredBy')}{' '}
          <Link href="https://contentful.com" isExternal color={theme.f36.blue500}>
            Contentful
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
