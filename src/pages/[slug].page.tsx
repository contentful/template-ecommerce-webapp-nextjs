import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';

import { ProductDetails, ProductTileGrid } from '@src/components/features/product';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';
import { i18n } from 'next-i18next.config';

const Page = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <ProductDetails {...product} />
      {product.relatedProductsCollection?.items && (
        <ProductTileGrid
          title={t('product.relatedProducts')}
          products={product.relatedProductsCollection.items}
        />
      )}
    </>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  if (!params.slug || !locale) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  try {
    const data = await client.pageProduct({ slug: params.slug, locale });
    const product = data.pageProductCollection?.items[0];

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

export const getStaticPaths: GetStaticPaths = async ({ locales = i18n.locales }) => {
  const dataPerLocale = await Promise.all(
    locales.map(locale => client.pageProductCollection({ locale })),
  );

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageProductCollection?.items.map(product =>
        product?.slug
          ? {
              params: {
                slug: product.slug,
              },
              locale: locales[index],
            }
          : undefined,
      ),
    )
    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
