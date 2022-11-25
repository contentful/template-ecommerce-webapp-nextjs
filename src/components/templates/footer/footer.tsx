import { Container, Box, Text, Link, useTheme } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box as="footer" width="full" mb={8} mt="auto" borderTop="1px" borderColor={theme.f36.gray200}>
      <Container ml={8} maxW="full">
        <Text my={8} fontSize="sm">
          {t('common.aboutUs')}
        </Text>
        <Text fontSize="sm">
          Lorem ipsum dolor sit amet consectetur. Placerat ut purus nam ac morbi erat ut. Laoreet
          duis augue vestibulum sed egestas tincidunt.
        </Text>
        <Text mb={8} fontSize="sm">
          Aliquet vitae consequat quam ut. Integer turpis sit porttitor rhoncus id quisque sed
          ullamcorper dolor. Commodo.
        </Text>
        <Text fontSize="sm">
          {t('common.poweredBy')}{' '}
          <Link href="https://contentful.com" isExternal color={theme.f36.blue500}>
            Contentful
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
