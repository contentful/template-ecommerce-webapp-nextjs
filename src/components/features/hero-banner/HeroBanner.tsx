import { Flex, Heading, Box, Grid, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { CtfImage } from '@src/components/features/contentful/ctf-image/CtfImage';
import { HEADER_HEIGHT } from '@src/components/templates/header';
import { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

const StyledBox = styled(Box)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

export const HeroBanner = ({
  heroBannerHeadline,
  heroBannerHeadlineColor,
  heroBannerImage,
}: PageLandingFieldsFragment) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const handleFontSize = () => {
      window.requestAnimationFrame(() => {
        if (containerRef.current && headingRef.current) {
          headingRef.current.style.display = 'inline-flex';

          const { width: containerWidth } = containerRef.current.getBoundingClientRect();
          const { width: headingWidth } = headingRef.current.getBoundingClientRect();

          const headingFontSize = window
            .getComputedStyle(headingRef.current, null)
            .getPropertyValue('font-size');

          const containerPadding = window
            .getComputedStyle(containerRef.current, null)
            .getPropertyValue('padding-left');

          headingRef.current.style.fontSize = `calc(${headingFontSize} * ${
            (containerWidth - parseInt(containerPadding, 10) * 2) / headingWidth
          })`;

          setHeadingVisible(true);
        }
      });
    };

    handleFontSize();

    window.addEventListener('resize', handleFontSize);
    return () => window.removeEventListener('resize', handleFontSize);
  }, []);

  return (
    <Grid position="relative" gridRow={2} gridColumn={1} mt={`-${HEADER_HEIGHT}px`}>
      <StyledBox
        gridColumnStart={2}
        zIndex={0}
        gridArea={{ base: '1 / 1 / 2 / 2' }}
        maxHeight={{ base: '50vh', lg: '80vh' }}>
        {heroBannerImage?.url && <CtfImage {...heroBannerImage} />}
      </StyledBox>

      <Flex
        flexDirection="column"
        zIndex={1}
        gridArea={{ base: '1 / 1 / 2 / 2' }}
        overflow="hidden"
        justifyContent="flex-end"
        maxHeight={{ base: '50vh', lg: '80vh' }}>
        <Container ref={containerRef}>
          <motion.div
            initial={false}
            animate={{
              opacity: headingVisible ? 1 : 0,
            }}>
            <Heading
              ref={headingRef}
              as="h1"
              letterSpacing="-0.11em"
              color={heroBannerHeadlineColor || 'white'}
              transform="translateY(0.33em)">
              {heroBannerHeadline}
            </Heading>
          </motion.div>
        </Container>
      </Flex>
    </Grid>
  );
};
