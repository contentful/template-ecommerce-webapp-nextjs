import { ChakraProvider } from '@chakra-ui/react';
import { Space_Grotesk } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { Layout } from '@src/components/templates/layout';
import { theme } from '@src/theme';

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider
      theme={{
        ...theme,
        fonts: {
          heading: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.heading}`,
          body: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.body}`,
        },
      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
