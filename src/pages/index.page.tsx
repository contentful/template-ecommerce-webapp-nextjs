import { Box } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { useLandingPage } from '@src/_ctf-private';
import { CtfXrayFrameDynamic } from '@src/_ctf-private/ctf-xray';
import { HeroBanner } from '@src/components/features/hero-banner';
import { ProductTileGrid } from '@src/components/features/product';
import { SeoFields } from '@src/components/features/seo';
import { client } from '@src/lib/client';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ page: ssrPage }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();

  /**
   * TODO: this is a main-private feature, and should be removed from the main branch during the split
   */
  const { data: page } = useLandingPage({ initialData: ssrPage });

  if (!page) return;

  return (
    <CtfXrayFrameDynamic entry={page}>
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
    </CtfXrayFrameDynamic>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    const data = await client.pageLanding({ locale });

    const page = data.pageLandingCollection?.items[0];

    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
