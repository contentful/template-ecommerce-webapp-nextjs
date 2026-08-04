import {
  createClient,
  resolveExperience,
  ServerExperienceRenderer,
} from '@contentful/experiences-react';
import type {
  ExperiencePayload,
  PortableRenderPlan,
  ServerExperienceRendererProps,
} from '@contentful/experiences-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ComponentType } from 'react';

import { experienceConfig } from '@src/lib/exo/experience-config';
import { normalizeExperiencePayload } from '@src/lib/exo/normalize-payload';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

// React-types cast (pre-alpha SDK). The SDK is built against React 19 types; the app pins
// @types/react@18 which expects JSX children to be `ReactElement | null`. Cast once at import.
// REMOVE when the app and SDK agree on React types.
const Renderer =
  ServerExperienceRenderer as unknown as ComponentType<ServerExperienceRendererProps>;

const Page = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Renderer experience={props.plan} config={experienceConfig} />;
};

export const getServerSideProps: GetServerSideProps<{ plan: PortableRenderPlan }> = async ({
  locale,
}) => {
  const { EXO_SPACE_ID, EXO_ENVIRONMENT_ID, EXO_EXPERIENCE_ID, EXO_DELIVERY_TOKEN } = process.env;
  const host = process.env.EXO_DELIVERY_HOST ?? 'https://xdn.contentful.com';

  if (!EXO_SPACE_ID || !EXO_ENVIRONMENT_ID || !EXO_EXPERIENCE_ID || !EXO_DELIVERY_TOKEN) {
    return { notFound: true };
  }

  try {
    const client = createClient({ accessToken: EXO_DELIVERY_TOKEN, host });
    const raw = (await client.view.getExperience(
      EXO_SPACE_ID,
      EXO_ENVIRONMENT_ID,
      EXO_EXPERIENCE_ID,
      { locale: locale ?? 'en-US' },
    )) as unknown as ExperiencePayload;
    const normalized = normalizeExperiencePayload(raw);
    const plan = await resolveExperience(normalized, experienceConfig);
    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        plan,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default Page;
