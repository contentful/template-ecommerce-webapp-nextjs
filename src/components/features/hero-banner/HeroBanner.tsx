import { Flex, Heading, Box, Grid, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { CtfImage } from '@src/components/features/contentful/ctf-image/CtfImage';
import { HEADER_HEIGHT } from '@src/components/templates/header';
import { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

const StyledBox = styled(Box)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-postion: top center;
  }
`;

export const HeroBanner = ({
  heroBannerHeadline,
  heroBannerHeadlineColor,
  heroBannerImage,
}: PageLandingFieldsFragment) => {
  return (
    <Grid position="relative" gridRow={2} gridColumn={1} mt={`-${HEADER_HEIGHT}px`}>
      <StyledBox
        gridColumnStart={2}
        zIndex={0}
        gridArea={{ base: '1 / 1 / 2 / 2' }}
        height={{ base: '50vh', lg: 'auto' }}>
        {heroBannerImage?.url && <CtfImage {...heroBannerImage} />}
      </StyledBox>

      <Flex
        flexDirection="column"
        zIndex={1}
        gridArea={{ base: '1 / 1 / 2 / 2' }}
        overflow="hidden">
        <Container as={Flex} justify="center" alignItems="flex-end" height="100%">
          <Heading
            as="h1"
            lineHeight="0.69"
            color={heroBannerHeadlineColor || 'white'}
            fontSize={{ base: '5.625rem', md: '12.5rem', lg: '17rem', xl: '24rem' }}>
            {heroBannerHeadline}
          </Heading>
        </Container>
      </Flex>
    </Grid>
  );
};
