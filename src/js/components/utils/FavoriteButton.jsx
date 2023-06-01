import { useState } from 'react';

import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FavoritesDto from '@/js/model/favorites/FavoritesDto';
import { addFavorite, removeFavorite } from '@/js/api/service/FavoritesService';
import { addFavoriteProductReducer, removeFavoriteProductReducer } from '@/js/redux/favoritesSlice';
import SnackbarMessage from './SnackbarMessage';
import { UNAUTHENTICATED_MESSAGE } from '@/js/constants/MessageConstants';

import { useSelector, useDispatch } from "react-redux";

export default function FavoriteButton(props) {
  const productNameFromProps = props.productName;
  const {productName: _, ...propsForButton} = props;
  const { isAuthenticated, username } = useSelector(state => state.authentication);
  const { products } = useSelector(state => state.favorites);
  const [isFavorite, setIsFavorite] = useState(products.includes(productNameFromProps));
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    
    if (!isAuthenticated) {
      setErrorMessage(UNAUTHENTICATED_MESSAGE);
      setHasError(true);
      return;
    } 

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

  const handleHasErrorFalse = () => {
    setHasError(false);
    setErrorMessage("");
  }

  return (
    <>
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
      {
        hasError 
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/> 
          : null
      }
    </>
  );
}