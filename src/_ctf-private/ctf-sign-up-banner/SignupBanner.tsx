import { Box, Button, Container, Flex, Text, useTheme } from '@chakra-ui/react';

import CfLogo from '@icons/cf-logo.svg';
import { LinkWithPersistedQuery } from '@src/components/shared/link-with-persisted-query';
import typewriter from 'analytics';

export const SignupBanner = () => {
  const theme = useTheme();
  const signupLink =
    'https://www.contentful.com/starter-templates/ecommerce-website/sign-up/?action=create_starter_template&template_name=ecommerce';
  const systemUIFontFamilies =
    '"Avenir Next W01", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const handleSignUpLinkClick = () => typewriter.signUpBannerInteracted({ ctaClicked: true });

  return (
    <Box position="sticky" top="0" bg="#0033A3" zIndex="200" height="54px">
      <Container py="2" position="relative" centerContent>
        <Flex alignItems="center" gap="4" justifyContent="center">
          <Text
            color={theme.f36.colorWhite}
            fontSize="14px"
            fontFamily={systemUIFontFamilies}
            display={{ md: 'none' }}>
            Content managed via
          </Text>

          <Box display="block" as={CfLogo} title="contentful-logo" />

          <Text
            color={theme.f36.colorWhite}
            fontSize="14px"
            fontFamily={systemUIFontFamilies}
            display={{ base: 'none', md: 'block' }}>
            The content on this template is managed via Contentful
          </Text>

          <LinkWithPersistedQuery href={signupLink} target="_blank" onClick={handleSignUpLinkClick}>
            <Button
              transition="all .4s ease"
              _hover={{
                bg: '#EFC800',
              }}
              color="#464E5B"
              fontSize="14px"
              fontFamily={systemUIFontFamilies}
              bg="#FFDA00"
              borderRadius="50px"
              fontWeight="600"
              px="24px"
              height="38px">
              <Text
                fontSize="14px"
                fontWeight="600"
                fontFamily={systemUIFontFamilies}
                display={{ base: 'none', md: 'block' }}>
                Start with this template
              </Text>
              <Text
                fontWeight="600"
                fontSize="14px"
                fontFamily={systemUIFontFamilies}
                display={{ base: 'block', md: 'none' }}>
                Use template
              </Text>
            </Button>
          </LinkWithPersistedQuery>
        </Flex>
      </Container>
    </Box>
  );
};
