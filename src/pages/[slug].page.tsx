import { Box } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { ProductDetails, ProductTileGrid } from '@src/components/features/product';
import { SeoFields } from '@src/components/features/seo';
import { client } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();

  return (
    <>
      {product.seoFields && <SeoFields {...product.seoFields} />}
      <ProductDetails {...product} />
      {product.relatedProductsCollection?.items && (
        <Box
          mt={{
            base: 5,
            md: 9,
            lg: 16,
          }}>
          <ProductTileGrid
            title={t('product.relatedProducts')}
            products={product.relatedProductsCollection.items}
          />
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  if (!params?.slug || !locale) {
    return {
      notFound: true,
    };
  }

  try {
    const data = await client.pageProduct({ slug: params.slug.toString(), locale });
    const product = data.pageProductCollection?.items[0];

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        product,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
