import { InferGetStaticPropsType } from 'next';

import { CtfHeroBanner } from '@src/components/features/contentful/CtfHeroBanner';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <CtfHeroBanner {...product} />;
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
