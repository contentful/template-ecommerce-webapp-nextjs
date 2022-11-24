import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

const Content = styled.main`
  min-height: 100%;
  width: 100%;
`;

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <Flex flexDirection="column" alignContent="center">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Flex>
  );
};
