import ProductPreview from "./ProductPreview";

import { styled } from "@mui/system";

export default function ProductGrid({ items }) {
  const GridContainer = styled('div')(({ theme }) => ({
    border: "none",
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 10
  }));

  return(
    <GridContainer>
        {items.map(item => <ProductPreview product={item} key={crypto.randomUUID()}/>)}
    </GridContainer>
  )
}