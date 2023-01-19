import "../../styles/pages/Cart.css";

import CartProduct from "../components/cart/CartProduct";
import AppFooter from "../components/footer/AppFooter";
import CustomPriceTypography from "../components/products/CustomPriceTypography";
import StyledHeader from "../components/styled/StyledHeader";
import StyledStepper from "../components/styled/StyledStepper";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import logo from "../../logo.svg";

export default function Cart() {
  const products = [
    {
      name: "Asus Vivobook 15 Pro",
      price: 1599.99,
      imageUrls: [logo]
    },
    {
      name: "Logitech G PRO X GAMING",
      price: 199.99,
      imageUrls: [logo]
    },
    {
      name: "Xiaomi 12t Pro 5G 256GB RAM 8GB Dual Sim Black",
      price: 1169.99,
      imageUrls: [logo]
    },
    {
      name: "Xiaomi POCO X3 NFC 128G 6GB RAM Cobalt Blue",
      price: 529.99,
      imageUrls: [logo]
    }
  ];

  const totalPrice = products.reduce((accumulator, product) => accumulator + product.price, 0);

  return (
    <>
      <StyledHeader/>
      <div className="cart-content">
        <StyledStepper activeStep={0}/>
        <Typography variant="h4" color="text.secondary" sx={{ mt: 10 }}>Cart items</Typography>
        <Typography
          variant="h6"
          sx={{ 
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            mt: 2
          }}
        >
          Total price: <CustomPriceTypography price={totalPrice}/>
        </Typography>
        <Button startIcon={<DeleteIcon/>} sx={{ mb: 1 }}>Remove all</Button>
        <div className="products-container">
          {products.map(product => <CartProduct product={product}/>)}
        </div>
        <div className="navigation-buttons">
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon/>}
            size="large"
            sx={{ width: "48%" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRightIcon/>}
            size="large"
            sx={{ width: "48%" }}
          >
            Next
          </Button>
        </div>
      </div>
      <AppFooter />
    </>
  );
}