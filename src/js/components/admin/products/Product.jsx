import "@/styles/admin/products/Product.css";

import { useState } from "react";

import { Link } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ProductFullScreenDialog from "@/js/components/utils/ProductFullScreenDialog";
import SnackbarMessage from "@/js/components/utils/SnackbarMessage";
import { buildProductUrl } from "@/js/api/builder/URLBuilder";
import { deleteProduct } from "@/js/api/service/ProductService";
import Action from "@/js/model/Action";

export default function Product({ product }) {
  const { name, images } = product;
  const mainImageUrl = images.find(image => image.main).url;
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProductDeleted, setIsProductDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleUpdateDialogOpen = () => {
    setIsUpdateDialogOpen(true);
  }

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  }

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  }

  const handleDeleteDialogClose = (event) => {
    event.preventDefault();
    setIsDeleteDialogOpen(false);
  }

  const openEditDialog = (event) => {
    event.preventDefault();
    handleUpdateDialogOpen();
  }

  const openDeleteDialog = (event) => {
    event.preventDefault();
    handleDeleteDialogOpen();
  }

  const resetErrorState = () => {
    setHasError(false);
    setErrorMessage("");
  }

  const handleIsProductDeletedFalse = () => {
    setIsProductDeleted(false);
  }

  const handleDelete = (event) => {
    deleteProduct(name)
      .then(response => {
        resetErrorState();
        setIsProductDeleted(true);
      })
      .catch(error => {
        const response = error.response;
        if (response.status === 400) {
          setErrorMessage(response.data.messages[0]);
          setHasError(true);
          handleIsProductDeletedFalse();
        }
      })
      .finally(() => handleDeleteDialogClose(event));
  }

  const actionButtons = [
    { text: "Edit", icon: <EditIcon/>, onClick: openEditDialog },
    { text: "Delete", icon: <DeleteIcon/>, onClick: openDeleteDialog }
  ];

  return (
    <div className="admin-product centered-column-container">
      <img src={mainImageUrl} alt={name}/>
      <Typography variant="h5">
        <Link className="link-default-color" to={`../${buildProductUrl(name)}`}>
          {name}
        </Link>
      </Typography>
      {actionButtons.map(button =>
        <Button
          key={crypto.randomUUID()} 
          variant="text" 
          startIcon={button.icon} 
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      )}
      {
        isUpdateDialogOpen
          ? <ProductFullScreenDialog
              action={Action.UPDATE}
              product={product}
              open={isUpdateDialogOpen}
              handleClose={handleUpdateDialogClose}
            />
          : null
      }
      
      <Dialog open={isDeleteDialogOpen}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undone this action!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Close</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
      {
        isProductDeleted
          ? <SnackbarMessage message="Product is deleted!" afterCloseCallback={handleIsProductDeletedFalse}/>
          : null
      }
      {
        hasError
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={resetErrorState}/>
          : null
      }
    </div>
  );
}
