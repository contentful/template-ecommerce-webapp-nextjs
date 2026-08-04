import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';

/**
 * Flat props emitted by the ExO delivery payload for the `product-tile-grid` componentType.
 * `tiles` is delivered as a single pre-rendered ReactNode by the SDK (NOT a data array).
 * `title` is optional — if unset, we fall back to the app's i18n label so the section header
 * matches the pre-ExO render (see reference/02-adapter-pattern.md — "app chrome is not content").
 */
export interface ProductTileGridExoProps {
  title?: string | null;
  tiles?: ReactNode;
}

/**
 * ExO adapter for the `product-tile-grid` componentType.
 * Reproduces the thin layout shell (Box spacing → Container → optional Heading → Grid) from
 * the customer's ProductTileGrid component, and drops the pre-rendered slot children inside.
 * The `mt` spacing is page-composition chrome (from the source page's JSX), not content —
 * see reference/02-adapter-pattern.md.
 */
export function ProductTileGridAdapter({ title, tiles }: ProductTileGridExoProps) {
  const { t } = useTranslation();
  const heading = title || t('product.trendingProducts');

  return (
    <Box mt={{ base: 5, md: 9, lg: 16 }}>
      <Container>
        {heading && (
          <Heading as="h2" mb={3}>
            {heading}
          </Heading>
        )}
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          rowGap={{ base: 6, lg: 6 }}
          columnGap={{ base: 4, lg: 24 }}
        >
          {tiles}
        </Grid>
      </Container>
    </Box>
  );
}
