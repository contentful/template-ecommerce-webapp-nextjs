import { Flex, useTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

// Routes that render the landing page and therefore want a transparent,
// borderless header (the hero slides up behind it via a negative margin).
// `/` is the classic GraphQL landing; `/exo-landing` is the ExO-rendered POC of
// the same page; `/preview` renders that same ExO landing as a draft inside the
// Contentful editor iframe. All three must share the landing chrome, or the
// preview shows a header border the published page does not — a false visual
// diff between the editor preview and the live page. In the shipped customer
// output the ExO landing replaces `/`, so this list collapses back to `/` plus
// the preview route — the extra entries only exist while the render paths
// coexist for side-by-side comparison.
const LANDING_ROUTES = ['/', '/exo-landing', '/preview'];

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const theme = useTheme();

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
