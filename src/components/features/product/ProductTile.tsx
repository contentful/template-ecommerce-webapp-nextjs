import { Box, Text } from '@chakra-ui/react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductTile = ({
  featuredProductImage,
  price,
  slug,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const { locale } = useRouter();
  return slug ? (
    <Box as={Link} href={slug}>
      {featuredProductImage && (
        <Box
          {...ContentfulLivePreview.getProps({
            entryId,
            fieldId: 'internalName',
            locale,
          })}
          borderRadius={4}
          overflow="hidden">
          <CtfImage {...featuredProductImage} />
        </Box>
      )}
      {price && (
        <Text
          {...ContentfulLivePreview.getProps({
            entryId,
            fieldId: 'price',
            locale,
          })}
          mt={3}
          fontWeight="500">
          <FormatCurrency value={price} />
        </Text>
      )}
    </Box>
  ) : null;
};
