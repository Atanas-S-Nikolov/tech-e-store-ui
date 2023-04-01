import { useState } from "react";

import AddIcon from '@mui/icons-material/Add';

import AdminNavigationBar from "../../components/admin/header/AdminNavigationBar";
import UserContainer from "../../components/admin/users/UserContainer";
import UserFullScreenDialog from "../../components/utils/UserFullScreenDialog";

import Action from "../../model/Action";
import StyledBottomFab from "../../components/styled/StyledBottomFab";

export default function UserInventoryPage() {
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
      <UserContainer/>
      <StyledBottomFab onClick={handleOpenDialog}>
        <AddIcon/>
      </StyledBottomFab>
      <UserFullScreenDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        action={Action.CREATE}
      />
    </>
  );
}
