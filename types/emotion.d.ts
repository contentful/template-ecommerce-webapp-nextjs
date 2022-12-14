/// <reference types="@emotion/react/types/css-prop" />
import { CustomTheme } from '@src/theme';

/**
 * Custom theme in global @emotion/react scope:
 * https://emotion.sh/docs/typescript#define-a-theme
 */
declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
