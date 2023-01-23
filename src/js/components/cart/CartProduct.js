import "../../../styles/cart/CartProduct.css";

import { useEffect, useState, useRef } from "react";

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

export default function CartProduct({ index, productWrapper, onUpdate, onRemove }) {
  const { name, price, imageUrls } = productWrapper.product;
  const initialQuantityValue = productWrapper.quantity;
  const quantity = useRef(initialQuantityValue);
  const productDisplayImage = imageUrls ? imageUrls[0] : "";
  const [stateQuantity, setStateQuantity] = useState(quantity.current);

  const increaseQuantity = () => {
    setStateQuantity(prevState => prevState += 1);
  }

  const decreaseQuantity = () => {
    setStateQuantity(prevState => prevState -= 1);
  }

  useEffect(() => {
    if (stateQuantity === initialQuantityValue) {
      onUpdate(false);
    } else {
      if (stateQuantity <= 0) {
        setStateQuantity(1);
      }
      quantity.current = stateQuantity;
      onUpdate(true);
    }
  }, [initialQuantityValue ,stateQuantity, onUpdate])

  useEffect(() => {
    onUpdate(false);
  }, [onUpdate])

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
                <Button
                  onClick={(event) => {
                    onUpdate(true);
                    onRemove(event, index);
                  }}
                  startIcon={<DeleteIcon/>}
                  sx={{ mb: 1 }}
                >
                  Remove
                </Button>
                <div className="quantity-controls">
                  <IconButton onClick={decreaseQuantity}>
                    <RemoveIcon/> 
                  </IconButton>
                  <Typography color="text.secondary" variant="h5">{stateQuantity}</Typography>
                  <IconButton onClick={increaseQuantity}>
                    <AddIcon/> 
                  </IconButton>
                  <CustomPriceTypography price={stateQuantity * price}/>
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