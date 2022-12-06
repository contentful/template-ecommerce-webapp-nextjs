import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useContentfulUtility } from '@src/components/features/contentful-utility';
import { PageProductFieldsFragment, PageProductQuery } from '@src/lib/__generated/sdk';

export const useProductPage = ({ slug, initialData }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulUtility();

  return useQuery<PageProductQuery | undefined, unknown, PageProductFieldsFragment>({
    queryKey: ['productPage'],
    queryFn: () => client?.pageProduct({ slug, locale, preview: preview === true || undefined }),
    select: data => {
      return data?.pageProductCollection?.items[0] || initialData;
    },
    initialData,
    enabled: !!client,
  });
};
