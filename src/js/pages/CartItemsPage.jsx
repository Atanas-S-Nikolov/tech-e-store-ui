import "@/styles/pages/Cart.css";

import CartProduct from "@/js/components/cart/CartProduct";
import CustomPriceTypography from "@/js/components/products/CustomPriceTypography";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from '@mui/icons-material/Delete';

import { deleteCart } from "@/js/api/service/CartService";
import { useDispatch, useSelector } from "react-redux";
import CartNavButtonsContainer from "@/js/components/utils/CartNavButtonsContainer";
import { useNavigate } from "react-router-dom";
import { CART_CHECKOUT_URL, CART_ORDER_URL } from "@/js/constants/UrlConstants";
import { useCart } from "@/js/hooks/useCart";
import AppFooter from "@/js/components/footer/AppFooter";
import CartTitle from "@/js/components/utils/CartTitle";
import { updateCartReducer, resetCartReducer } from "@/js/redux/cartSlice";
import { resetQuickOrderReducer } from "@/js/redux/quickOrderSlice";
import getSteps from "@/js/utils/CartSteps";
import { CART_ITEMS_STEP } from "@/js/utils/CartSteps";
import StyledHeader from "@/js/components/styled/StyledHeader";
import StyledStepper from "@/js/components/styled/StyledStepper";

export default function CartItemsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.authentication);
  const { cartResponse } = useSelector(state => state.cart);
  const { key, products = [], totalPrice = 0 } = cartResponse;
  const sortedProducts = [...products].sort((p1, p2) => p1.product.price > p2.product.price);
  const loading = useCart();
  const isCartEmpty = !loading || (sortedProducts?.length === 0 && totalPrice === 0);

  return (
    <>
      <StyledHeader/>
      <div className="cart-content">
        <StyledStepper steps={getSteps()} activeStep={0}/>
        <CartTitle text={CART_ITEMS_STEP}/>
        {isCartEmpty ? <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>There are no products in the cart yet!</Typography> : null}
        {
          loading
            ? <>
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
                {
                  !isCartEmpty
                    ? <Button
                        onClick={handleRemoveAllProducts}
                        startIcon={<DeleteIcon/>}
                        sx={{ mb: 1 }}
                      >
                        Remove all
                      </Button>
                    : null
                }
                <div className="products-container">
                  {sortedProducts.map((productWrapper, index) => (
                    <CartProduct
                      key={index}
                      productWrapper={productWrapper}
                      onUpdate={handleUpdateCart}
                    />))}
                </div>
              </>
            : null
        }
        <CartNavButtonsContainer nextBtnDisabled={isCartEmpty} nextBtnOnClick={navigateToNextStep}/>
      </div>
      <AppFooter />
    </>
  );

  function handleRemoveAllProducts(event) {
    event.preventDefault();
    clearCartDetails(key)
  }

  async function handleUpdateCart(cart) {
    const cartProducts = cart.products;
    if (cartProducts.length === 0) {
      clearCartDetails(cart.key)
      return;
    }
    dispatch(updateCartReducer(cart));
  }

  async function clearCartDetails(cartKey) {
    await deleteCart(cartKey);
    dispatch(resetCartReducer());
    dispatch(resetQuickOrderReducer());
  }

  function navigateToNextStep() {
    isAuthenticated ? navigate(CART_CHECKOUT_URL) : navigate(CART_ORDER_URL);
  }
}