import { extendTheme } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

import { heading, text } from '@src/theme/components';
import { globalStyle } from '@src/theme/global-style';

export const theme = extendTheme({
  styles: { global: globalStyle },
  f36: tokens,
  components: {
    Heading: heading,
    Text: text,
  },
});

export type CustomTheme = typeof theme;
