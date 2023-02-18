import "../../../styles/cart/CartProduct.css";

import { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";

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

import { addProductToCart, removeProductFromCart } from "../../api/backend";
import CartDto from "../../model/cart/CartDto";
import ProductToBuyDto from "../../model/product/ProductToBuyDto";

export default function CartProduct({ productWrapper, onUpdate }) {
  const { name, price, imageUrls } = productWrapper.product;
  const initialQuantityValue = productWrapper.quantity;
  const quantity = useRef(initialQuantityValue);
  const productDisplayImage = imageUrls ? imageUrls[0] : "";
  const [stateQuantity, setStateQuantity] = useState(quantity.current);
  const { username } = useSelector(state => state.authentication);

  const increaseQuantity = () => {
    setStateQuantity(prevState => prevState += 1);
  }

  const decreaseQuantity = () => {
    setStateQuantity(prevState => prevState -= 1);
  }

  useEffect(() => {
    if (stateQuantity <= 0) {
      setStateQuantity(1);
    }
    quantity.current = stateQuantity;
    const products = ProductToBuyDto.buildProductsToBuy(name, stateQuantity);
    const cartDto = new CartDto(username, ProductToBuyDto.convertToProductsToBuy(products));
    addProductToCart(cartDto)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => console.log(error));
  }, [stateQuantity])

  const handleRemoveProduct = (event) => {
    event.preventDefault();
    const products = ProductToBuyDto.buildProductToBuy(name);
    removeProductFromCart(new CartDto(username, ProductToBuyDto.convertToProductsToBuy(products)))
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => console.log(error));
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
                <Button
                  onClick={handleRemoveProduct}
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