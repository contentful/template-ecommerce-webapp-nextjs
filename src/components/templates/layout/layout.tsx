import { Box, useTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
  img: string;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Header
        borderBottom={router.pathname === '/' ? '' : '1px'}
        borderColor={router.pathname === '/' ? null : theme.f36.gray200}
      />
      <Box width="100%" as="main" pb={{ base: 8, lg: 12 }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};
