import { SystemStyleObject } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

export const globalStyle: SystemStyleObject = {
  'html, body': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: '100%',
    color: tokens.gray800,
    overflowX: 'hidden',
  },
  '#__next': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    fontDisplay: 'swap',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
};
