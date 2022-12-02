import { Text, Container, Flex, Heading, Link as TextLink, useTheme } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const ErrorPage404 = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container as={Flex} flexDirection="column" my="auto" py={20}>
      <Heading as="h1" variant="h2">
        {t('notFound.title')}
      </Heading>
      <Text mt={4}>
        <Trans i18nKey="notFound.description">
          <TextLink color={theme.f36.blue500} as={Link} href="/" />
        </Trans>
      </Text>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
};

export default ErrorPage404;
