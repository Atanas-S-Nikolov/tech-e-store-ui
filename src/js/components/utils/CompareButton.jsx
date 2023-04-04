import Button from '@mui/material/Button';

import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { addProductReducer } from '../../redux/productCompareSlice';

import { useDispatch } from "react-redux";
import ProductCompareError from '../../errors/ProductCompareError';
import { useState } from 'react';

import SnackbarMessage from "./SnackbarMessage";

export default function FavoriteButton(props) {
  const { product } = props;
  const {product: _, ...propsForButton} = props;
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const handleCompare = (event) => {
    event.preventDefault();
    try {
      dispatch(addProductReducer(product));
      setIsProductAdded(true);
    } catch(error) {
      if (error instanceof ProductCompareError) {
        setHasError(true);
        setErrorMessage(error.message);
      }
    }
  }

  function handleIsProductAddedFalse() {
    setIsProductAdded(false);
  }

  function handleHasErrorFalse() {
    setHasError(false);
  }

  return (
    <>
      <Button
        onClick={handleCompare}
        startIcon={<CompareArrowsIcon/>}
        {...propsForButton}
      >
        Compare
      </Button>
      {
        isProductAdded 
          ? <SnackbarMessage
            message="Product is added!"
            afterCloseCallback={handleIsProductAddedFalse}
          /> 
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