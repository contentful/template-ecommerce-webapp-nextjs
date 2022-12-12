import { ChakraProvider } from '@chakra-ui/react';
import localFont from '@next/font/local';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { Layout } from '@src/components/templates/layout';
import { theme } from '@src/theme';

const spaceGrotesk = localFont({
  src: [
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
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
