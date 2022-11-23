import styled from '@emotion/styled';
import { InferGetStaticPropsType } from 'next';

import { getServerSideTranslations } from '@src/utils/get-serverside-translations';

const SomeText = styled.h1`
  color: red;
`;

const Page = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <SomeText>Hello world!</SomeText>;
};

export const getStaticProps = async ({ locale }) => {
  return {
    revalidate: 60,
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default Page;
