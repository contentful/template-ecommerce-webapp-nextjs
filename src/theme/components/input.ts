import { ComponentStyleConfig } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

export const input: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        backgroundColor: tokens.colorWhite,
        fontWeight: 400,
      },
    },
  },
  defaultProps: {
    variant: 'outline',
  },
};
