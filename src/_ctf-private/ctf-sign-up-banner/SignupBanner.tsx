import { Box, Button, Container, Flex, Text, useTheme } from '@chakra-ui/react';
import Link from 'next/link';

import CfLogo from '@icons/cf-logo.svg';

export const SignupBanner = () => {
  const theme = useTheme();
  const signupLink =
    'https://www.contentful.com/starter-templates/ecommerce-website/sign-up/?action=create_starter_template&template_name=ecommerce';
  const systemUIFontFamilies =
    '"Avenir Next W01", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

  return (
    <Box position="sticky" top="0" bg="#0033A3" zIndex="200">
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

          <Link href={signupLink} target="_blank">
            <Button
              transition="all .4s ease"
              _hover={{
                bg: '#EFC800',
              }}
              fontSize="14px"
              fontFamily={systemUIFontFamilies}
              bg="#FFDA00"
              borderRadius="25px"
              fontWeight="600"
              pl="24px"
              pr="24px">
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
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};
