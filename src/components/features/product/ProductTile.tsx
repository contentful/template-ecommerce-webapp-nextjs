import { Box, Text } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { LinkWithPersistedQuery } from '@src/components/shared/link-wIth-persisted-query';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductTile = ({
  featuredProductImage,
  price,
  slug,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });
  return slug ? (
    <div {...inspectorProps({ fieldId: 'featuredProductImage' })}>
      <Box as={LinkWithPersistedQuery} href={slug}>
        {featuredProductImage && (
          <Box borderRadius={4} overflow="hidden">
            <CtfImage {...featuredProductImage} />
          </Box>
        )}
        {price && (
          <Text {...inspectorProps({ fieldId: 'price' })} mt={3} fontWeight="500">
            <FormatCurrency value={price} />
          </Text>
        )}
      </Box>
    </div>
  ) : null;
};
