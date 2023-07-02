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
  const {product, ...propsForButton} = props
  const { cartResponse } = useSelector(state => state.cart)
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { key, products } = cartResponse;
  const isCartEmpty = isBlank(key);
  const dispatch = useDispatch();

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

  function handleCreateCart(products) {
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

  function handleAddProductToCart(products) {
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

  function handleClick() {
    const productName = product.name
    const existingProduct = products?.find(p => p.product.name === productName);
    const productsToBuy = existingProduct
      ? ProductToBuyDto.buildProductToBuy(productName, existingProduct.quantity + 1)
      : ProductToBuyDto.buildProductToBuy(productName);
    
    isCartEmpty ? handleCreateCart(productsToBuy) : handleAddProductToCart(productsToBuy);
  }

  function handleProductIsNotAddedToCart() {
    setIsProductAddedToCart(false);
  }

  function handleHasErrorFalse() {
    setHasError(false);
  }
}