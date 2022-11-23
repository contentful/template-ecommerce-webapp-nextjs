import { Box, Paragraph, TextLink } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import styled from '@emotion/styled';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 167px;
  margin-bottom: ${tokens.spacing4Xl};
`;

const FooterContent = styled.div`
  margin-left: ${tokens.spacing4Xl};
`;

export const Footer = () => {
  return (
    <Container>
      <Box margin="spacing4Xl">
        <hr />
        <FooterContent>
          <Paragraph>about us</Paragraph>
          <Paragraph marginBottom="none">
            Lorem ipsum dolor sit amet consectetur. Placerat ut purus nam ac morbi erat ut. Laoreet
            duis augue vestibulum sed egestas tincidunt.
          </Paragraph>
          <Paragraph>
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
