import "@/styles/pages/Cart.css";

import Typography from "@mui/material/Typography";

import StyledHeader from "@/js/components/styled/StyledHeader";
import StyledStepper from "@/js/components/styled/StyledStepper";
import CartNavButtonsContainer from "@/js/components/utils/CartNavButtonsContainer";
import CartCheckoutProduct from "@/js/components/cart/CartCheckoutProduct";
import CartOrderInformation from "@/js/components/cart/CartOrderInformation";
import CustomPriceTypography from "@/js/components/products/CustomPriceTypography";
import CartTitle from "@/js/components/utils/CartTitle";
import AppFooter from "@/js/components/footer/AppFooter";

import OrderDto from "@/js/model/order/OrderDto";
import getSteps, { CART_CHECKOUT_STEP } from "@/js/utils/CartSteps";
import { useCart } from "@/js/hooks/useCart";
import { cartPurchase } from "@/js/api/service/CartService";
import { createOrder } from "@/js/api/service/OrderService";
import { resetCartReducer } from "@/js/redux/cartSlice";
import { resetQuickOrderReducer } from "@/js/redux/quickOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/js/constants/UrlConstants";

export default function CartCheckoutPage() {
  const { isAuthenticated, username } = useSelector(state => state.authentication);
  const { order } = useSelector(state => state.quickOrder);
  const { cartResponse } = useSelector(state => state.cart);
  const { key, products, totalPrice } = cartResponse;
  const currentStep = isAuthenticated ? 1 : 2;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useCart();

  return (
    <>
      <StyledHeader/>
      <div className="cart-content">
        <StyledStepper steps={getSteps()} activeStep={currentStep}/>
        <CartTitle text={CART_CHECKOUT_STEP}/>
        {
          loading
            ? (
                <>
                  <div className="products-container">
                    {products?.map((product, index) => {
                      return (
                        <CartCheckoutProduct key={index} productWrapper={product} quantity={product.quantity}/>
                      );
                    })}
                  </div>
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
                    Total price: <CustomPriceTypography price={totalPrice}/>
                  </Typography>
                  <CartOrderInformation/>
                </>
              )
              : null
        }
        <CartNavButtonsContainer nextBtnText="Finish" nextBtnOnClick={finishOrder}/>
      </div>
      <AppFooter />
    </>
  );

  function finishOrder(event) {
    event.preventDefault();
    const promise = isAuthenticated ? createOrder(new OrderDto(username, key)) : cartPurchase(key, order);
    promise.then(response => {
      dispatch(resetCartReducer());
      dispatch(resetQuickOrderReducer());
      navigate(HOME_URL);
    })
    .catch(error => console.log(error));
  }
}