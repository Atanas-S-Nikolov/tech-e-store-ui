import { useState } from "react";

import AddIcon from '@mui/icons-material/Add';

import AdminNavigationBar from "../../components/admin/header/AdminNavigationBar";
import ProductContainer from "../../components/admin/products/ProductContainer";
import ProductFullScreenDialog from "../../components/utils/ProductFullScreenDialog";

import StyledBottomFab from "../../components/styled/StyledBottomFab";
import Action from "../../model/Action";

export default function ProductInventoryPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

  return (
    <>
      <AdminNavigationBar/>
      <ProductContainer/>
      <StyledBottomFab onClick={handleOpenDialog}>
        <AddIcon/>
      </StyledBottomFab>
      {
        isDialogOpen
          ? <ProductFullScreenDialog action={Action.CREATE} open={isDialogOpen} handleClose={handleCloseDialog}/>
          : null
      }
    </>
  );
}
