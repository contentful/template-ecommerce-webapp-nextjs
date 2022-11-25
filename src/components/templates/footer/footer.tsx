import { Box, Text, Link, useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.f36.spacingXl};
`;

const FooterContent = styled.div`
  margin-left: ${({ theme }) => theme.f36.spacingXl};

  > p {
    font-size: ${({ theme }) => theme.f36.fontSizeM};
  }
`;

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container>
      <Box>
        <hr />
        <FooterContent>
          <Text my={8}>{t('common.aboutUs')}</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur. Placerat ut purus nam ac morbi erat ut. Laoreet
            duis augue vestibulum sed egestas tincidunt.
          </Text>
          <Text mb={8}>
            Aliquet vitae consequat quam ut. Integer turpis sit porttitor rhoncus id quisque sed
            ullamcorper dolor. Commodo.
          </Text>
          <Text>
            {t('common.poweredBy')}{' '}
            <Link href="https://contentful.com" isExternal color={theme.f36.blue500}>
              Contentful
            </Link>
          </Text>
        </FooterContent>
      </Box>
    </Container>
  );
};
