import { ProductTile } from '@src/components/features/product';
import type { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

import { IMAGE_RATIOS, toImageFragment, toNumber } from '../shared';

/**
 * Flat props emitted by the ExO delivery payload for the `product-tile` componentType.
 * `price` is delivered as a real JSON number today; the defensive `toNumber` coercion keeps
 * things safe if the schema ever switches to string.
 */
export interface ProductTileExoProps {
  slug?: string | null;
  price?: number | string | null;
  /** Bare URL string (image dimensions are not carried in this payload — see shared.ts). */
  image?: string | null;
}

/**
 * ExO adapter for the `product-tile` componentType.
 * Flat ExO props → PageProductFieldsFragment shape → the app's existing ProductTile component.
 */
export function ProductTileAdapter({ slug, price, image }: ProductTileExoProps) {
  const product: PageProductFieldsFragment = {
    __typename: 'PageProduct',
    slug: slug ?? null,
    price: toNumber(price),
    featuredProductImage: toImageFragment(image, IMAGE_RATIOS.productTile, slug),
    internalName: null,
    name: null,
    description: null,
    seoFields: null,
    productImagesCollection: null,
    relatedProductsCollection: null,
    sys: { __typename: 'Sys', id: slug ?? 'exo-product-tile', spaceId: '' },
  };
  return <ProductTile {...product} />;
}
