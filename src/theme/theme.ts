import { extendTheme } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

export const theme = extendTheme({
  f36: tokens,
});

export type CustomTheme = typeof theme;
