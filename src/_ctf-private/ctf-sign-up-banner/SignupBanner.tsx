import { Box, Button, Container, Flex, Text, useBreakpointValue, useTheme } from '@chakra-ui/react';
import Link from 'next/link';

import { useSticky } from './hooks/useSticky';

import CfLogo from '@icons/cf-logo.svg';

export const SignupBanner = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const theme = useTheme();
  const signupLink =
    'https://www.contentful.com/starter-templates/ecommerce-website/sign-up/?action=create_starter_template&template_name=ecommerce';
  const systemUIFontFamilies =
    '"Avenir Next W01", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

  const { sticky, stickyRef } = useSticky();

  return (
    <>
      <Box
        bg="#0033A3"
        ref={stickyRef}
        css={sticky && { position: 'fixed', top: 0, width: '100%', zIndex: 200 }}>
        <Container py="2" position="relative" centerContent>
          <Flex alignItems="center" gap={isMobile ? 2 : 4} justifyContent="center">
            {isMobile && (
              <Text color={theme.f36.colorWhite} fontSize="14px" fontFamily={systemUIFontFamilies}>
                Content managed via
              </Text>
            )}
            <Box display="block" as={CfLogo} title="contentful-logo" />
            {!isMobile && (
              <Text color={theme.f36.colorWhite} fontSize="14px" fontFamily={systemUIFontFamilies}>
                The content on this template is managed via Contentful
              </Text>
            )}
            <Link href={signupLink} target="_blank">
              <Button
                css={{
                  transition: 'all .4s ease',
                }}
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
                {isMobile ? 'Use template' : 'Start with this template'}
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
      {sticky && (
        <div
          style={{
            height: `${stickyRef.current?.clientHeight}px`,
          }}
        />
      )}
    </>
  );
};
