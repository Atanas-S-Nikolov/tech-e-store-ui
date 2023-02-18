import Button from '@mui/material/Button';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux';

import { updateProductsCountReducer } from '../../redux/cartSlice';
import { addProductToCart } from '../../api/backend';
import CartDto from '../../model/cart/CartDto';
import ProductToBuyDto from '../../model/product/ProductToBuyDto';

export default function BuyButton(props) {
  const { product } = props;
  const {product: _, ...propsForButton} = props
  const { username, isAuthenticated } = useSelector(state => state.authentication);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isAuthenticated) {
      const products = ProductToBuyDto.buildProductToBuy(product.name);
      addProductToCart(new CartDto(username, ProductToBuyDto.convertToProductsToBuy(products)))
        .then(response => {
          dispatch(updateProductsCountReducer(response.data.products.length));
        })
        .catch(error => console.log(error));
    }
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
    </>
  );
}