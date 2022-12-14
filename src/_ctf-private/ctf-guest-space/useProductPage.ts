import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useContentfulEditorial } from '@src/_ctf-private';
import { PageProductFieldsFragment, PageProductQuery } from '@src/lib/__generated/sdk';

export const useProductPage = ({ slug, initialData }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulEditorial();

  return useQuery<PageProductQuery | undefined, unknown, PageProductFieldsFragment>({
    queryKey: ['productPage', locale, preview, slug],
    queryFn: () => client?.pageProduct({ slug, locale, preview }),
    select: data => {
      return data?.pageProductCollection?.items[0] || initialData;
    },
    initialData,
    enabled: !!client,
  });
};
