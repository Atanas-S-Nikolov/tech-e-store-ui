import "@/styles/cart/CartProduct.css";

import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import CustomPriceTypography from "@/js/components/products/CustomPriceTypography";

export default function CartCheckoutProduct({ productWrapper, quantity }) {
  const { name, price, images } = productWrapper.product;
  const productMainImageUrl = images.find(image => image.main).url;
  const formatedPrice = (quantity * price).toFixed(2);

  return (
    <div className="cart-product">
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <img src={productMainImageUrl} alt={name}/>
              </TableCell>
              <TableCell>
                <Typography variant="h5">{name}</Typography>
              </TableCell>
              <TableCell align="right">
                <CustomPriceTypography price={formatedPrice}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}