import { ChakraProvider } from '@chakra-ui/react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from "next/router"

import { CtfCustomQueryClientProvider } from '@src/_ctf-private';
import { CtfSegmentAnalytics } from '@src/_ctf-private/ctf-analytics';
import { Layout } from '@src/components/templates/layout';
import { theme } from '@src/theme';

const allowedOriginList = [
  'https://app.contentful.com',
  'https://app.eu.contentful.com',
  'https://app.flinkly.com',
  'https://app.eu.flinkly.com',
  'https://app.quirely.com',
  'https://app.eu.quirely.com',
  'http://localhost:3001'
];

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
  const router = useRouter()

  return (
    <ContentfulLivePreviewProvider
      locale={router.locale || 'en-US'}
      targetOrigin={allowedOriginList}
      enableInspectorMode={pageProps.previewActive}
      enableLiveUpdates={pageProps.previewActive}>
      <CtfCustomQueryClientProvider>
        <CtfSegmentAnalytics />
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
      </CtfCustomQueryClientProvider>
    </ContentfulLivePreviewProvider>
  );
};

export default appWithTranslation(App);
