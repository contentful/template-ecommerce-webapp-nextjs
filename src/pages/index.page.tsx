import { Container } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';

import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <h1>Hello world!</h1>
    </Container>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    revalidate: revalidateDuration,
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default Page;
