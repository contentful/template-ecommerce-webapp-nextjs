import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { Layout } from '@src/components/templates/layout';
import { theme } from '@src/theme';

const App = ({ Component, pageProps }: AppProps) => {
  // console.log(pageProps.product.__typename);
  return (
    <ChakraProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
