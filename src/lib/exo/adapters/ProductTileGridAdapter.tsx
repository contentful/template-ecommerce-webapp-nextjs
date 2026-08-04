/*
 * ExO adapter for the `product-tile-grid` component type.
 *
 * Unlike the leaf adapters, a grid receives its children as a PRE-RENDERED
 * slot, not as data: the SDK renders the `tiles` slot subtree and merges it
 * into the prop bag under the slot name `tiles` (a single ReactNode). So this
 * adapter cannot reuse <ProductTileGrid>'s `products`-array API — instead it
 * reproduces only that component's thin Chakra layout shell (Container →
 * optional Heading → Grid) and drops the rendered tiles inside.
 *
 * The tiles themselves are still fully reused: each is a <ProductTileAdapter>
 * wrapping the unchanged <ProductTile>. Each ProductTile renders a root <div>,
 * which becomes a direct child of the CSS Grid (the wrapping Fragment is
 * transparent), so the column layout is preserved without per-item GridItem
 * wrappers.
 *
 * Kept byte-for-byte in sync with ProductTileGrid.tsx's Grid props so the two
 * render paths look identical. If that component's layout changes, update here.
 */

import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';

interface ProductTileGridExoProps {
  // The `products` slot rendered by the SDK, merged in under the slot name.
  tiles?: ReactNode;
  // Optional editorial title binding. The legacy landing page does NOT store
  // this in the CMS — it passes an app i18n label (`product.trendingProducts`)
  // in index.page.tsx JSX. So on the ExO path the content-provided title is
  // normally empty and we fall back to that same label to stay identical.
  title?: string | null;
}

export function ProductTileGridAdapter({ tiles, title }: ProductTileGridExoProps) {
  const { t } = useTranslation();
  // Match index.page.tsx: the grid section title is an app label, not content.
  const heading = title || t('product.trendingProducts');

  return (
    // The legacy page wraps <ProductTileGrid> in <Box mt={{base:5,md:9,lg:16}}>
    // (index.page.tsx) to separate the grid section from the hero above it.
    // That spacing is page-composition JSX, not content or a design property,
    // so the consuming adapter reproduces it here to keep the section spacing
    // identical to the original.
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
