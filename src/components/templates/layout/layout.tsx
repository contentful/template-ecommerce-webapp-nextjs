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

  const isHomePage = router.pathname === '/';

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
