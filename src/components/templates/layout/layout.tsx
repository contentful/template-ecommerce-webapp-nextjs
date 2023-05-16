import { Flex, useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

import { CtfToolboxDynamic } from '@src/_ctf-private';

const CtfSignUpBanner = dynamic(
  () => import('@src/_ctf-private/ctf-sign-up-banner/CtfSignupBanner'),
);

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const { referrer } = router.query;
  const theme = useTheme();

  const isHomePage = router.pathname === '/';

  return (
    <>
      {referrer && <CtfSignUpBanner />}
      <Header
        borderBottom={isHomePage ? '' : '1px'}
        borderColor={isHomePage ? null : theme.f36.gray200}
      />
      <Flex flexGrow="1" flexDirection="column" width="100%" as="main" pb={{ base: 8, lg: 12 }}>
        {children}
      </Flex>
      <CtfToolboxDynamic />
      <Footer />
    </>
  );
};
