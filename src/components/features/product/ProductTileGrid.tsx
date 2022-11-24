import { ProductTile } from '@src/components/features/product/ProductTile';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

interface ProductTileGridProps {
  title: string;
  products: Array<PageProductFieldsFragment | undefined | null>;
}

export const ProductTileGrid = ({ title, products }: ProductTileGridProps) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      <div>
        {products.map(product => {
          return <div key={product?.name}>{product ? <ProductTile {...product} /> : null}</div>;
        })}
      </div>
    </>
  );
};
