import { Box } from '@chakra-ui/react';
import { Paragraph, TextLink } from '@contentful/f36-components';
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
    font-size: ${({ theme }) => theme.f36.fontSizeS};
  }
`;

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box>
        <hr />
        <FooterContent>
          <Paragraph marginTop="spacingXl" marginBottom="spacingXl">
            {t('common.aboutUs')}
          </Paragraph>
          <Paragraph marginBottom="none">
            Lorem ipsum dolor sit amet consectetur. Placerat ut purus nam ac morbi erat ut. Laoreet
            duis augue vestibulum sed egestas tincidunt.
          </Paragraph>
          <Paragraph marginBottom="spacingXl">
            Aliquet vitae consequat quam ut. Integer turpis sit porttitor rhoncus id quisque sed
            ullamcorper dolor. Commodo.
          </Paragraph>
          <Paragraph>
            {t('common.poweredBy')}{' '}
            <TextLink href="https://contentful.com" target="_blank" rel="noopener noreferrer">
              Contentful
            </TextLink>
          </Paragraph>
        </FooterContent>
      </Box>
    </Container>
  );
};
