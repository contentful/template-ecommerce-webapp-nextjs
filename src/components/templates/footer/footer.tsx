import { Box, Paragraph, TextLink } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import styled from '@emotion/styled';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: ${tokens.spacing2Xl};
`;

const FooterContent = styled.div`
  margin-left: ${tokens.spacingXl};

  > p: {
    font-size: ${tokens.fontSizeS};
  }
`;

export const Footer = () => {
  return (
    <Container>
      <Box>
        <hr />
        <FooterContent>
          <Paragraph marginTop="spacingXl" marginBottom="spacingXl">
            about us
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
            Powered by{' '}
            <TextLink href="https://contentful.com" target="_blank" rel="noopener noreferrer">
              Contentful
            </TextLink>
          </Paragraph>
        </FooterContent>
      </Box>
    </Container>
  );
};
