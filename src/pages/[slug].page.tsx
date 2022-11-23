import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { i18n } from 'next-i18next.config';

const Page = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <>Product page: {product.name}</>;
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
