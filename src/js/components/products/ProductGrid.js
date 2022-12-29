import ProductPreview from "./ProductPreview";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

export default function ProductGrid({ items }) {
  const GridPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 10
  }));

  return(
    <GridPaper elevation={3}>
        {items.map(item => <ProductPreview product={item} key={crypto.randomUUID()}/>)}
    </GridPaper>
  )
}