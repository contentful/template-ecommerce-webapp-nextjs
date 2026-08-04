/*
 * ExO adapter for the `product-tile` component type.
 *
 * Maps flat delivery props (slug, price, image) onto the
 * PageProductFieldsFragment that the existing <ProductTile> consumes.
 * <ProductTile> is left unchanged.
 */

import { ProductTile } from '@src/components/features/product';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

import { toImageFragment, IMAGE_RATIOS, toNumber } from './shared';

interface ProductTileExoProps {
  slug?: string | null;
  price?: number | string | null;
  image?: string | null;
}

export function ProductTileAdapter({ slug, price, image }: ProductTileExoProps) {
  const product: PageProductFieldsFragment = {
    __typename: 'PageProduct',
    internalName: slug ?? null,
    name: null,
    description: null,
    slug: slug ?? null,
    price: toNumber(price) ?? null,
    featuredProductImage: toImageFragment(image, IMAGE_RATIOS.productTile, slug) ?? null,
    seoFields: null,
    // <ProductTile> keys inspector mode on this id; POC placeholder.
    sys: { __typename: 'Sys', id: `exo-product-${slug ?? 'unknown'}`, spaceId: '' },
  } as PageProductFieldsFragment;

  return <ProductTile {...product} />;
}
