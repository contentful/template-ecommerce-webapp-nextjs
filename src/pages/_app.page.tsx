import { ChakraProvider } from '@chakra-ui/react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import localFont from '@next/font/local';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

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

// Editor origins the Contentful Live Preview SDK will accept postMessages from.
// The SDK defaults to the production hosts only; on staging the editor runs on
// app.flinkly.com, so an unlisted origin makes it throw "The current origin is
// not supported. Please provide a targetOrigin ..." and crash the framed page.
// Override via NEXT_PUBLIC_CTF_PREVIEW_TARGET_ORIGINS (comma-separated) per env.
const PREVIEW_TARGET_ORIGINS = (
  process.env.NEXT_PUBLIC_CTF_PREVIEW_TARGET_ORIGINS ??
  'https://app.contentful.com,https://app.eu.contentful.com,https://app.flinkly.com'
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <ContentfulLivePreviewProvider
      locale={router.locale || 'en-US'}
      targetOrigin={PREVIEW_TARGET_ORIGINS}
      enableInspectorMode={pageProps.previewActive}
      enableLiveUpdates={pageProps.previewActive}
    >
      <ChakraProvider
        theme={{
          ...theme,
          fonts: {
            heading: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.heading}`,
            body: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.body}`,
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ContentfulLivePreviewProvider>
  );
};

export default appWithTranslation(App);
