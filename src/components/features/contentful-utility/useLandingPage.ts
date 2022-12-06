import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useContentfulUtility } from '@src/components/features/contentful-utility';
import { PageLandingFieldsFragment, PageLandingQuery } from '@src/lib/__generated/sdk';

export const useLandingPage = ({ initialData }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulUtility();

  return useQuery<PageLandingQuery | undefined, unknown, PageLandingFieldsFragment>({
    queryKey: ['landingPage'],
    queryFn: () => client?.pageLanding({ locale, preview: preview === true || undefined }),
    select: data => {
      return data?.pageLandingCollection?.items[0] || initialData;
    },
    initialData,
    enabled: !!client,
  });
};
