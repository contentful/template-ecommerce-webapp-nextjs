import { Flex, useTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const theme = useTheme();

  // Route-path allow-list for the borderless homepage header chrome. `/preview` is included so
  // the editor iframe render matches the delivery route rather than showing a stray header
  // border (see reference/05-preview.md §2.5).
  const LANDING_ROUTES = ['/', '/preview'];
  const isHomePage = LANDING_ROUTES.includes(router.pathname);

  return (
    <>
      <Header
        borderBottom={isHomePage ? '' : '1px'}
        borderColor={isHomePage ? null : theme.f36.gray200}
      />
      <Flex flexGrow="1" flexDirection="column" width="100%" as="main" pb={{ base: 8, lg: 12 }}>
        {children}
      </Flex>
      <Footer />
    </>
  );
};
