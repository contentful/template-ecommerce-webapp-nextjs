import { Box, Text, Link, useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.f36.spacingXl};
`;

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container>
      <hr />
      <Box ml={8}>
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
      </Box>
    </Container>
  );
};
