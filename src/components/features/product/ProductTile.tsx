import Link from 'next/link';

import { CtfImage } from '@src/components/features/contentful';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductTile = ({ featuredProductImage, price, slug }: PageProductFieldsFragment) => {
  return slug ? (
    <Link href={slug}>
      {featuredProductImage && <CtfImage {...featuredProductImage} />}
      {price && <FormatCurrency value={price} />}
    </Link>
  ) : null;
};
