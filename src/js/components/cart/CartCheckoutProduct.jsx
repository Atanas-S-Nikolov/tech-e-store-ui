import "@/styles/cart/CartProduct.css";

import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import CustomPriceTypography from "@/js/components/products/CustomPriceTypography";

export default function CartCheckoutProduct({ productWrapper, quantity }) {
  const { name, price, imageUrls } = productWrapper.product;
  const productDisplayImage = imageUrls ? imageUrls[0] : "";

  return (
    <div className="cart-product">
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <img src={productDisplayImage} alt={name}/>
              </TableCell>
              <TableCell>
                <Typography variant="h5">{name}</Typography>
              </TableCell>
              <TableCell align="right">
                <CustomPriceTypography price={quantity * price}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}