import "../../styles/pages/Cart.css";

import { useLayoutEffect, useState } from "react";

import CartItemsSection from "../components/cart/CartItemsSection";
import CartCheckoutSection from "../components/cart/CartCheckoutSection";
import AppFooter from "../components/footer/AppFooter";
import StyledHeader from "../components/styled/StyledHeader";
import StyledStepper from "../components/styled/StyledStepper";
import { HOME_URL } from "../constants/UrlConstants";
import { getCart, clearCart } from "../api/backend";
import UsernameDto from "../model/auth/UsernameDto.js";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { backStepReducer, nextStepReducer, resetStepReducer } from "../redux/cartSlice";
import { updateProductsCountReducer } from "../redux/cartSlice";

export default function Cart() {
  const { username } = useSelector(state => state.authentication);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getCart(new UsernameDto(username))
      .then(response => {
        const cartResponse = response.data;
        setCart(cartResponse);
        setIsCartEmpty(cartResponse.products.length === 0);
        setLoading(true);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  const handleUpdateCart = (cartResponse) => {
    dispatch(updateProductsCountReducer(cartResponse.products.length));
    setCart(cartResponse);
    setLoading(true);
  }

  const { activeStep } = useSelector(state => state.cart)
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isFinalStep = activeStep >= 2; 
  let pageHeadingText = isFirstStep ? "Cart items" : (isSecondStep ? "Checkout" : "Done!");
  let backBtnVisible = isSecondStep;
  let rightBtnLabel = isFinalStep ?  "Finish" : "Next";

  const navigate = useNavigate();

  const handleBackStep = (event) => {
    event.preventDefault();
    dispatch(backStepReducer());
  }

  async function handleNextStep(event) {
    event.preventDefault();
    if (isFinalStep) {
      await clearCart(new UsernameDto(username));
      dispatch(resetStepReducer());
      navigate(HOME_URL);
      return;
    }
    dispatch(nextStepReducer());
  }

  const shouldRenderEmptyCartMessage = !loading || cart.totalPrice === 0;
  const shouldRenderItemsSection = isFirstStep && loading && cart.totalPrice > 0;
  const shouldRenderCheckoutSection = isSecondStep && loading && cart.totalPrice > 0;

  return (
    <>
      <StyledHeader/>
      <div className="cart-content">
        <StyledStepper activeStep={activeStep}/>
        <Typography variant="h4" color="text.secondary" sx={{ mt: 10 }}>{pageHeadingText}</Typography>
        {shouldRenderEmptyCartMessage ? <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>There are no products in the cart yet!</Typography> : null}
        {shouldRenderItemsSection ? <CartItemsSection cart={cart} onUpdateCart={handleUpdateCart}/> : null}
        {shouldRenderCheckoutSection ? <CartCheckoutSection cart={cart}/> : null}
        <div className="navigation-buttons">
          {
            backBtnVisible
            ? (
                <Button
                  variant="contained"
                  startIcon={<KeyboardArrowLeftIcon/>}
                  size="large"
                  onClick={handleBackStep}
                  sx={{ width: "48%" }}
                >
                  Back
                </Button>
              ) 
            : null
          }
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRightIcon/>}
            size="large"
            disabled={isCartEmpty || shouldRenderEmptyCartMessage}
            onClick={handleNextStep}
            sx={{ width: "48%" }}
          >
            {rightBtnLabel}
          </Button>
        </div>
      </div>
      <AppFooter />
    </>
  );
}