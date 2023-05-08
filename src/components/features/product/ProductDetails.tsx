import { Box, Container, Flex, Grid, GridItem, Heading, Text, useTheme } from '@chakra-ui/react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { useRouter } from 'next/router';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { QuantitySelector } from '@src/components/shared/quantity-selector';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductDetails = ({
  name,
  price,
  description,
  featuredProductImage,
  productImagesCollection,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const theme = useTheme();
  const { locale } = useRouter();

  return (
    <Container mt={{ base: 6, lg: 16 }}>
      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 5, lg: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 7, xl: 8 }}>
          <Flex flexDirection="column" gap={{ base: 3, lg: 5 }}>
            {featuredProductImage && (
              <CtfImage
                livePreviewProps={ContentfulLivePreview.getProps({
                  entryId,
                  fieldId: 'featuredProductImage',
                  locale,
                })}
                {...featuredProductImage}
              />
            )}
            {productImagesCollection?.items &&
              productImagesCollection.items.map(image => {
                return image ? (
                  <CtfImage
                    livePreviewProps={ContentfulLivePreview.getProps({
                      entryId,
                      fieldId: 'productImages',
                      locale,
                    })}
                    key={image.sys.id}
                    imageProps={{
                      sizes: '(max-width: 1200px) 70vw, 100vw',
                    }}
                    {...image}
                  />
                ) : null;
              })}
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 5, xl: 4 }}>
          <Box
            width="100%"
            bg={theme.f36.gray100}
            mb="auto"
            borderRadius={4}
            px={{ base: 4, lg: 6 }}
            pt={{ base: 6, lg: 6 }}
            pb={{ base: 8, lg: 14 }}>
            <Heading
              {...ContentfulLivePreview.getProps({
                entryId,
                fieldId: 'name',
                locale,
              })}
              as="h1"
              variant="h3">
              {name}
            </Heading>
            {price && (
              <Text
                {...ContentfulLivePreview.getProps({
                  entryId,
                  fieldId: 'price',
                  locale,
                })}
                mt={1}
                fontWeight="500">
                <FormatCurrency value={price} />
              </Text>
            )}
            <Text
              {...ContentfulLivePreview.getProps({
                entryId,
                fieldId: 'description',
                locale,
              })}
              mt={5}
              color={theme.f36.gray700}>
              {description}
            </Text>

            <Box mt={{ base: 5, lg: 10 }}>
              <QuantitySelector />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
