import { CtfImage } from '@src/components/features/contentful';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { QuantitySelector } from '@src/components/shared/quantity-selector';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductDetails = ({
  name,
  price,
  description,
  featuredProductImage,
  productImagesCollection,
}: PageProductFieldsFragment) => {
  return (
    <>
      {featuredProductImage && <CtfImage {...featuredProductImage} />}
      {productImagesCollection?.items &&
        productImagesCollection.items.map(image => {
          return image ? (
            <div key={image.sys.id}>
              <CtfImage {...image} />
            </div>
          ) : null;
        })}
      <div>
        <h1>{name}</h1>
        {price && <FormatCurrency value={price} />}
        <p>{description}</p>
        <QuantitySelector />
      </div>
    </>
  );
};
