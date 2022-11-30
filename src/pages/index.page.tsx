import { Box } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { HeroBanner } from '@src/components/features/hero-banner';
import { ProductTileGrid } from '@src/components/features/product';
import { SeoFields } from '@src/components/features/seo';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <HeroBanner {...page} />
      {page.productsCollection?.items && (
        <Box
          mt={{
            base: 5,
            md: 9,
            lg: 16,
          }}>
          <ProductTileGrid
            title={t('product.trendingProducts')}
            products={page.productsCollection.items}
          />
        </Box>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  try {
    const data = await client.pageLanding({ locale });
    const page = data.pageLandingCollection?.items[0];

    if (!page) {
      return {
        notFound: true,
        revalidate: revalidateDuration,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
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
