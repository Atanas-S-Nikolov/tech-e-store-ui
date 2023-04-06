import Typography from "@mui/material/Typography";
import CustomPriceTypography from "@/js/components/products/CustomPriceTypography";

import CartCheckoutProduct from "./CartCheckoutProduct";

export default function CartCheckoutSection({ cart }) {
  return (
    <div className="products-container">
      {cart.products.map((product, index) => {
        return (
          <CartCheckoutProduct key={index} productWrapper={product} quantity={product.quantity}/>
        );
      })}
      <Typography
        sx={{ 
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          float: "right",
          mt: 2,
          gap: 1
        }}
      >
        Total price: <CustomPriceTypography price={cart.totalPrice}/>
      </Typography>
    </div>
  );
}