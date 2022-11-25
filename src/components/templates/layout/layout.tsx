import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <>
      <Header />
      <Box width="100%" as="main" pb={{ base: 8, lg: 12 }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};
