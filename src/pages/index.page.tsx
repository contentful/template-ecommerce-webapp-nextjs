import { Box } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { HeroBanner } from '@src/components/features/hero-banner';
import { ProductTileGrid } from '@src/components/features/product';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <HeroBanner {...product} />
      {product.productsCollection?.items && (
        <Box
          mt={{
            base: 5,
            md: 9,
            lg: 16,
          }}>
          <ProductTileGrid
            title={t('product.trendingProducts')}
            products={product.productsCollection.items}
          />
        </Box>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  try {
    const data = await client.pageLanding({ locale });
    const product = data.pageLandingCollection?.items[0];

    if (!product) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        product,
      },
    };
  } catch {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
};

export default Page;
