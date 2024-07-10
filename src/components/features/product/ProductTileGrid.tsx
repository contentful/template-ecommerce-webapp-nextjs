import { Container, Grid, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ProductTile } from '@src/components/features/product/ProductTile';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

interface ProductTileGridProps {
  title: string;
  products: Array<PageProductFieldsFragment | undefined | null>;
}

const StyledHeading = styled('h4')`
  font-size: 28px;
  line-height: 0.8em;
  margin-bottom: 15px;
`;

export const ProductTileGrid = ({ title, products }: ProductTileGridProps) => {
  return (
    <Container>
      {title && <StyledHeading>{title}</StyledHeading>}
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        rowGap={{ base: 6, lg: 6 }}
        columnGap={{ base: 4, lg: 24 }}>
        {products.map((product, index) => {
          return <GridItem key={index}>{product ? <ProductTile {...product} /> : null}</GridItem>;
        })}
      </Grid>
    </Container>
  );
};
