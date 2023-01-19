import "../../../styles/cart/CartProduct.css";

import { useState } from "react";

import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomPriceTypography from "../products/CustomPriceTypography";

export default function CartProduct({ product }) {
  const { name, price, imageUrls } = product;
  const productDisplayImage = imageUrls ? imageUrls[0] : "";

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevState => ++prevState);
  }

  const decreaseQuantity = () => {
    setQuantity(prevState => --prevState);
  }

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
                <Button startIcon={<DeleteIcon/>} sx={{ mb: 1 }}>Remove</Button>
                <div className="quantity-controls">
                  <IconButton onClick={decreaseQuantity}>
                    <RemoveIcon/> 
                  </IconButton>
                  <Typography color="text.secondary" variant="h5">{quantity}</Typography>
                  <IconButton onClick={increaseQuantity}>
                    <AddIcon/> 
                  </IconButton>
                  <CustomPriceTypography price={quantity * price}/>
                </div>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>Price for one: {price} lv</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}