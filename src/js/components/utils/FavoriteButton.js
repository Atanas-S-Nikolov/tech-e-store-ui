import { useState } from 'react';

import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FavoritesDto from '../../model/favorites/FavoritesDto';
import { addFavorite, removeFavorite } from '../../api/backend';
import { addFavoriteProductReducer, removeFavoriteProductReducer } from '../../redux/favoritesSlice';

import { useSelector, useDispatch } from "react-redux";

export default function FavoriteButton(props) {
  const productNameFromProps = props.productName;
  const {productName: _, ...propsForButton} = props;
  const { username } = useSelector(state => state.authentication);
  const { products } = useSelector(state => state.favorites);
  const [isFavorite, setIsFavorite] = useState(products.includes(productNameFromProps));
  const dispatch = useDispatch();

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    setIsFavorite(prevState => !prevState);
    const favoritesDto = new FavoritesDto(username, [productNameFromProps]);
    if (isFavorite) {
      removeFavorite(favoritesDto)
        .then(() => dispatch(removeFavoriteProductReducer(productNameFromProps)));
      return;
    }
    addFavorite(favoritesDto)
      .then(() => dispatch(addFavoriteProductReducer(productNameFromProps)));
  }

  return (
    <Button
      startIcon={
        isFavorite 
          ? <FavoriteIcon sx={{ color: "red" }}/>
          : <FavoriteBorderIcon/>
      }
      onClick={event => handleFavoriteClick(event)}
      {...propsForButton}
    >
      Favorite
    </Button>
  );
}