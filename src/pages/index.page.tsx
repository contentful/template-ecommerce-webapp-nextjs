import { Container } from '@chakra-ui/react';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { CtfHeroBanner } from '@src/components/features/contentful/CtfHeroBanner';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';
import { i18n } from 'next-i18next.config';

const Page = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <h1>Hello world!</h1>
    </Container>
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

export const getStaticPaths: GetStaticPaths = async ({ locales = i18n.locales }) => {
  const dataPerLocale = await Promise.all(
    locales.map(locale => client.pageLandingCollection({ locale })),
  );

  const paths = dataPerLocale
    .flatMap((data, index) =>
      data.pageLandingCollection?.items.map(product => console.log(product)),
    )
    .filter(Boolean);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
