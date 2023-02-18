import CartProduct from "./CartProduct";
import CustomPriceTypography from "../products/CustomPriceTypography";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from '@mui/icons-material/Delete';

import { clearCart } from "../../api/backend";
import { useSelector } from "react-redux";
import UsernameDto from "../../model/auth/UsernameDto";

export default function CartItemsSection({ cart, onUpdateCart }) {
  const { products, totalPrice } = cart;
  const { username } = useSelector(state => state.authentication);
  
  const handleRemoveAllProducts = (event) => {
    event.preventDefault();
    clearCart(new UsernameDto(username))
      .then(response => {
        onUpdateCart(response.data);
      })
      .catch(error => console.log(error));
  }

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
      <div className="products-container">
        {products.map((product, index) => (
          <CartProduct
            key={index}
            productWrapper={product}
            onUpdate={onUpdateCart}
          />))}
      </div>
    </>
  );
}