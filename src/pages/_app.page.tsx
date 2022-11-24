import { ThemeProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { Layout } from '@src/components/templates/layout';
import { theme } from '@src/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
