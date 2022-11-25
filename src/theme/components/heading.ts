import { ComponentStyleConfig } from '@chakra-ui/react';

export const heading: ComponentStyleConfig = {
  variants: {
    h2: {
      fontSize: { base: '1.75rem', lg: '2.25rem' },
      lineHeight: { base: 1.28571, lg: 1.33333 },
    },
    h3: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
  },
  baseStyle: {
    fontWeight: 600,
    fontSize: { base: '1.75rem', lg: '2.25rem' },
    lineHeight: { base: 1.28571, lg: 1.33333 },
  },
  defaultProps: {
    as: 'h2',
    size: null,
  },
};
