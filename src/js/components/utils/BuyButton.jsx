import { useState } from 'react';

import Button from '@mui/material/Button';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux';

import { updateCartReducer } from '@/js/redux/cartSlice';
import { createCart, addProductToCart } from '@/js/api/service/CartService';
import CartDto from '@/js/model/cart/CartDto';
import UpdateCartDto from '@/js/model/cart/UpdateCartDto';
import ProductToBuyDto from '@/js/model/product/ProductToBuyDto';
import SnackbarMessage from './SnackbarMessage';
import { isBlank } from 'underscore.string';

export default function BuyButton(props) {
  const { product } = props;
  const {product: _, ...propsForButton} = props
  const { cartResponse } = useSelector(state => state.cart)
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { key } = cartResponse;
  const isCartEmpty = isBlank(key);
  const dispatch = useDispatch();

  const handleCreateCart = (products) => {
    createCart(new CartDto(ProductToBuyDto.convertToProductsToBuy(products)))
    .then(response => {
      dispatch(updateCartReducer(response.data));
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

  const handleAddProductToCart = (products) => {
    addProductToCart(new UpdateCartDto(ProductToBuyDto.convertToProductsToBuy(products), key))
    .then(response => {
      dispatch(updateCartReducer(response.data));
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

  const handleClick = () => {
    const products = ProductToBuyDto.buildProductToBuy(product.name);
    isCartEmpty ? handleCreateCart(products) : handleAddProductToCart(products);
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