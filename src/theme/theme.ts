import { extendTheme } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

import { heading, text, container, button, input } from '@src/theme/components';
import { globalStyle } from '@src/theme/global-style';

export const theme = extendTheme({
  styles: { global: globalStyle },
  f36: tokens,
  components: {
    Container: container,
    Button: button,
    Heading: heading,
    Text: text,
    Input: input,
  },
});

export type CustomTheme = typeof theme;
