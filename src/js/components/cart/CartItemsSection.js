import { useState } from "react";

import CartDto from "../../model/cart/CartDto.js";
import CartProduct from "./CartProduct";
import CustomPriceTypography from "../products/CustomPriceTypography";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector } from "react-redux";

export default function CartItemsSection({ cart, onUpdateCart }) {
  const [isUpdateBtnVisible, setIsUpdateBtnVisible] = useState(false);
  const { products, totalPrice } = cart;
  const [stateProducts, setStateProducts] = useState(products);

  const handleRemoveProduct = (event, index) => {
    event.preventDefault();
    stateProducts.splice(index, 1);
    setStateProducts(stateProducts)
    if (stateProducts.length === 0) {
      setStateProducts([])
    }
  }

  const handleRemoveAllProducts = (event) => {
    event.preventDefault();
    setStateProducts([]);
    setIsUpdateBtnVisible(true);
  }

  const convertToProductsToBuy = () => {
    const productsToBuy = [];
    products.forEach(p => {
      productsToBuy.push({
        "productName": p.product.name,
        "quantity": p.quantity
      })
    });
    return productsToBuy;
  } 

  const { username } = useSelector(state => state.authentication);
  
  return (
    <>
      <Typography
        variant="h6"
        sx={{ 
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mt: 2
        }}
      >
        Total price: <CustomPriceTypography price={totalPrice}/>
      </Typography>
      <Button
        onClick={handleRemoveAllProducts}
        startIcon={<DeleteIcon/>}
        sx={{ mb: 1 }}
      >
        Remove all
      </Button>
      <Zoom in={isUpdateBtnVisible}>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => onUpdateCart(new CartDto(username, convertToProductsToBuy()))}
        >
          Update
        </Fab>
      </Zoom>
      <div className="products-container">
        {stateProducts.map((product, index) => (
          <CartProduct
            key={index}
            index={index}
            productWrapper={product}
            onUpdate={setIsUpdateBtnVisible}
            onRemove={handleRemoveProduct}
          />))}
      </div>
    </>
  );
}