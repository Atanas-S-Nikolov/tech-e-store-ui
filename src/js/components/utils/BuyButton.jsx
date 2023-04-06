import { useState } from 'react';

import Button from '@mui/material/Button';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux';

import { updateProductsReducer } from '@/js/redux/cartSlice';
import { addProductToCart } from '@/js/api/service/CartService';
import CartDto from '@/js/model/cart/CartDto';
import ProductToBuyDto from '@/js/model/product/ProductToBuyDto';
import SnackbarMessage from './SnackbarMessage';

export default function BuyButton(props) {
  const { product } = props;
  const {product: _, ...propsForButton} = props
  const { username, isAuthenticated } = useSelector(state => state.authentication);
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isAuthenticated) {
      const products = ProductToBuyDto.buildProductToBuy(product.name);
      addProductToCart(new CartDto(username, ProductToBuyDto.convertToProductsToBuy(products)))
        .then(response => {
          dispatch(updateProductsReducer(response.data.products));
        setIsProductAddedToCart(true);
        })
        .catch(error => {
          const response = error.response;
          if (response.status === 400) {
            setIsProductAddedToCart(false);
            setErrorMessage(response.data.messages[0]);
            setHasError(true);
          }
        });
    }
  }

  function handleProductIsNotAddedToCart() {
    setIsProductAddedToCart(false);
  }

  function handleHasErrorFalse() {
    setHasError(false);
  }

  return (
    <>
      <Button
        size='large'
        startIcon={<ShoppingCartIcon/>}
        onClick={handleClick}
        {...propsForButton}
      >
        Buy
      </Button>
      {
        isProductAddedToCart
          ? <SnackbarMessage message="Product is added to Cart!" afterCloseCallback={handleProductIsNotAddedToCart}/>
          : null
      }
      {
        hasError 
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/> 
          : null
      }
    </>
  );
}