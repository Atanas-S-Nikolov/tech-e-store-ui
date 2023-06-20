import "@/styles/utils/ProductFullScreenDialog.css";

import { useState, useEffect, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import StyledCloseIconButton from "@/js/components/styled/StyledCloseIconButton";
import StyledGridContainer from "@/js/components/styled/StyledGridContainer";

import CustomFormTextInput from './CustomFormTextInput';
import CustomFormSelect from './CustomFormSelect';
import ProductCategory from '@/js/model/product/ProductCategory';
import ProductDto from '@/js/model/product/ProductDto';
import DeleteImagesDto from "@/js/model/product/DeleteImagesDto";
import { select } from '@/js/utils/ProductTypeSelector';
import SnackbarMessage from './SnackbarMessage';
import Action from '@/js/model/Action';
import { createProduct, updateProduct } from '@/js/api/service/ProductService';
import { isValidUrl } from "@/js/utils/URLUtils";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductFullScreenDialog({ open, handleClose, action, product }) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [earlyAccess, setEarlyAccess] = useState(false);
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrlsToDelete, setImageUrlsToDelete] = useState([]);
  const [productImageUrls, setProductImageUrls] = useState(product?.imageUrls);
  const [imageIsRemoved, setImageIsRemoved] = useState(false);
  const [shouldCombineImages, setShouldCombineImages] = useState(false);
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);
  
  // error state
  const [hasBrandError, setHasBrandError] = useState(false);
  const [brandErrorMessage, setBrandErrorMessage] = useState("");
  const [hasModelError, setHasModelError] = useState(false);
  const [modelErrorMessage, setModelErrorMessage] = useState("");
  const [hasCategoryError, setHasCategoryError] = useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const [hasTypeError, setHasTypeError] = useState(false);
  const [typeErrorMessage, setTypeErrorMessage] = useState("");
  const [hasPriceError, setHasPriceError] = useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [hasStocksError, setHasStocksError] = useState(false);
  const [stocksErrorMessage, setStocksErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSwitchOnChange = () => {
    setEarlyAccess(prevState => !prevState);
  }

  const handleIsSavedFailed = () => {
    setIsSavedSuccessfully(false);
  }

  function handleHasErrorFalse() {
    setHasError(false);
  }

  function resetBackendErrorState() {
    setBrandErrorMessage("");
    setHasBrandError(false);
    setModelErrorMessage("");
    setHasModelError(false);
    setCategoryErrorMessage("");
    setHasCategoryError(false);
    setTypeErrorMessage("");
    setHasTypeError(false);
    setPriceErrorMessage("");
    setHasPriceError(false);
    setStocksErrorMessage("");
    setHasStocksError(false);
    handleHasErrorFalse();
  }

  function setBackendErrorState(property, message) {
    switch(property) {
      case "model":
        setModelErrorMessage(message);
        setHasModelError(true);
        break;
      case "brand":
        setBrandErrorMessage(message);
        setHasBrandError(true);
        break;
      case "category":
        setCategoryErrorMessage(message);
        setHasCategoryError(true);
        break;
      case "type":
        setTypeErrorMessage(message);
        setHasTypeError(true);
        break;
      case "price":
        setPriceErrorMessage(message);
        setHasPriceError(true);
        break;
      case "stocks":
        setStocksErrorMessage(message);
        setHasStocksError(true);
        break;
      default:
        console.log("No one property was recognized!");
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    try {
      const productDto = new ProductDto(`${brand} ${model}`, price, stocks, category, type, brand, model, description, earlyAccess);
      switch(action) {
        case Action.CREATE:
          await createProduct(productDto, images);
          break;
        case Action.UPDATE:
          await updateProduct(productDto, images, new DeleteImagesDto(imageUrlsToDelete));
          break;
        default:
          console.log("Action did not match!");
          return;
      }
      setIsSavedSuccessfully(true);
    } catch(error) {
      const response = error.response;
      const status = response.status;
      if (status === 400) {
        const { rejectedProperties } = response.data;
        resetBackendErrorState();

        rejectedProperties.forEach(rejected => {
          const { property, message } = rejected;
          setBackendErrorState(property, message);
        });
      } else if (status === 409) {
        setErrorMessage(response.data.messages[0]);
        setHasError(true);
      }
    }
  }

  useEffect(() => {
    switch(action) {
      case Action.CREATE:
        setTitle("Create product");
        break;
      case Action.UPDATE:
        setTitle("Edit product");
        if (product) {
          setBrand(product.brand);
          setModel(product.model);
          setCategory(product.category);
          setType(product.type);
          setPrice(product.price);
          setStocks(product.stocks);
          setEarlyAccess(product.earlyAccess);
          setDescription(product.description);
          setImageUrls(product.imageUrls);
        }
        break;
      default:
        console.log("Action did not match!");
    }
  }, [action, product])

  useEffect(() => {
    if (!imageIsRemoved) {
      if (productImageUrls && productImageUrls.length > 0 && !shouldCombineImages) {
        return;
      }
      const urls = [];
      images?.forEach(image => {
        const url = isValidUrl(image) ? image : URL.createObjectURL(image);
        urls.push(url);
      });
      setImageUrls(urls);
      setImages(images);
    }
  }, [images, imageIsRemoved, shouldCombineImages, productImageUrls])

  
  function handleRemoveImage(event, index, url) {
    event.preventDefault();
    switch(action) {
      case Action.CREATE:
        const imagesCopy = [...images];
        imagesCopy.splice(index, 1);
        setImages(imagesCopy);
        break;
      case Action.UPDATE:
        const productImageUrlsCopy = [...productImageUrls];
        productImageUrlsCopy.splice(index, 1);
        setImageUrls(productImageUrlsCopy);
        setProductImageUrls(productImageUrlsCopy);
        if (url.startsWith("https://firebasestorage.googleapis.com/")) {
          const urlsToDelete = [url, ...imageUrlsToDelete];
          setImageUrlsToDelete(urlsToDelete);
        }
        setImageIsRemoved(true);
        
        break;
      default:
        console.log("Action did not match!");
    }
  }

  function handleImageChange(event) {
    event.preventDefault();
    setShouldCombineImages(false);
    setImageIsRemoved(false);
    let allImages = [...event.target.files];
    if (!shouldCombineImages && action === Action.CREATE) {
      allImages = [...allImages, ...imageUrls]
    }
    if (productImageUrls && action === Action.UPDATE) {
      allImages = [...allImages, ...productImageUrls];
      setShouldCombineImages(true);
    }
    setImages(allImages);
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="centered-container">
        <div>
          <CustomFormTextInput
            id="brand"
            label="Brand"
            required
            error={hasBrandError}
            errorMessage={brandErrorMessage}
            value={brand}
            onChange={event => setBrand(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="model"
            label="Model"
            required
            error={hasModelError}
            errorMessage={modelErrorMessage}
            value={model}
            onChange={event => setModel(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <CustomFormSelect
            id="category"
            label="Category"
            labelId="category-label-id"
            error={hasCategoryError}
            errorMessage={categoryErrorMessage}
            value={category}
            values={ProductCategory.getValues().map(pCategory => pCategory.name)}
            onChange={event => setCategory(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormSelect
            id="type"
            label="Type"
            labelId="type-label-id"
            error={hasTypeError}
            errorMessage={typeErrorMessage}
            value={type}
            values={select(ProductCategory.getKeyByValue(category)).map(pType => pType.name)}
            onChange={event => setType(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="price"
            label="Price"
            required
            error={hasPriceError}
            errorMessage={priceErrorMessage}
            value={price}
            onChange={event => setPrice(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="stocks"
            label="Stocks"
            error={hasStocksError}
            errorMessage={stocksErrorMessage}
            value={stocks}
            onChange={event => setStocks(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <TextField
          id="description"
          label="Description"
          margin='normal'
          value={description}
          onChange={event => setDescription(event.target.value)}
          multiline
          rows={50}
          // rows={description.split(/\r\n|\r|\n/).length}
          sx={{ width: "82ch"}}
        />
        <div>
          <FormControlLabel
            control={<Switch checked={earlyAccess} onChange={handleSwitchOnChange}/>}
            label="Early access"
          />
          <>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" multiple type="file" onChange={handleImageChange}/>
              <InsertPhotoIcon/>
            </IconButton>
            <br/>
            <StyledGridContainer gridTemplateColumns="repeat(3, 1fr)">
              {imageUrls.map((url, index) => {
                return (
                  <Box key={crypto.randomUUID()}>
                    <StyledCloseIconButton onClick={(event) => handleRemoveImage(event, index, url)}/>
                    <img className="upl-img" src={url} alt={url}/>
                  </Box>
                );
              })}
            </StyledGridContainer>
          </>
        </div>
      </Box>
      {
        isSavedSuccessfully 
          ? <SnackbarMessage message="Product is saved!" afterCloseCallback={handleIsSavedFailed}/>
          : null
      }
      {
        hasError
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/>
          : null
      }
    </Dialog>
  );
}
