/*
 * ExO code-rewrite POC — the landing page rendered from an ETL-seeded
 * Experience via the Experience Delivery API (XDA), instead of the classic
 * GraphQL query used by index.page.tsx.
 *
 * Flow (Pages Router):
 *   getServerSideProps
 *     → createClient({ host: staging XDA })            fetch the published experience
 *     → client.view.getExperience(...)                  raw XDA payload (template-variant)
 *     → normalizeExperiencePayload(...)                 lift template slots → flat nodes
 *     → resolveExperience(payload, config)              → PortableRenderPlan (pure data)
 *   Page body
 *     → <ServerExperienceRenderer experience={plan} config={experienceConfig} />
 *
 * The legacy index.page.tsx is left in place; this route renders the same
 * landing content through the ExO path so the two can be compared side by side.
 */

import {
  ServerExperienceRenderer,
  createClient,
  resolveExperience,
  type ExperiencePayload,
  type PortableRenderPlan,
  type ServerExperienceRendererProps,
} from '@contentful/experiences-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ComponentType } from 'react';

import { experienceConfig } from '@src/lib/exo/experience-config';
import { normalizeExperiencePayload } from '@src/lib/exo/normalize-payload';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

// @contentful/experiences-react is built against React 19 types, where a
// function component may return `ReactNode`. This project pins @types/react@18,
// whose JSX contract still expects `ReactElement | null`, so TS rejects the
// renderer as a JSX tag. Cast to the project's component type — a types-version
// bridge only, no runtime effect.
const Renderer = ServerExperienceRenderer as ComponentType<ServerExperienceRendererProps>;

const ExoLandingPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Renderer experience={props.plan} config={experienceConfig} />;
};

export const getServerSideProps: GetServerSideProps<{
  plan: PortableRenderPlan;
}> = async ({ locale }) => {
  const spaceId = process.env.EXO_SPACE_ID;
  const environmentId = process.env.EXO_ENVIRONMENT_ID;
  const experienceId = process.env.EXO_EXPERIENCE_ID;
  const accessToken = process.env.EXO_DELIVERY_TOKEN;
  // Staging XDA. Prod default (xdn.contentful.com) is baked into the SDK; the
  // ETL-seeded space lives on flinkly, so we override the host explicitly.
  const host = process.env.EXO_DELIVERY_HOST ?? 'https://xdn.flinkly.com';

  if (!spaceId || !environmentId || !experienceId || !accessToken) {
    // Missing config — surface as 404 rather than a 500 with a stack trace.
    return { notFound: true };
  }

  try {
    const client = createClient({ accessToken, host });

    const raw = (await client.view.getExperience(spaceId, environmentId, experienceId, {
      locale: locale ?? 'en-US',
    })) as unknown as ExperiencePayload;

    // Bridge the template-variant payload to the SDK's flat-nodes model.
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

export default ExoLandingPage;
