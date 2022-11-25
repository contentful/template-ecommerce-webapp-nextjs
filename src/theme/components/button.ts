import { ComponentStyleConfig } from '@chakra-ui/react';
import tokens from '@contentful/f36-tokens';

export const button: ComponentStyleConfig = {
  variants: {
    primary: {
      backgroundColor: tokens.blue500,
      color: tokens.colorWhite,
      _hover: {
        backgroundColor: tokens.blue600,
      },
    },
  },
};
