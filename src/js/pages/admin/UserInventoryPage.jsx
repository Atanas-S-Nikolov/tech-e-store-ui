import { useState } from "react";

import AddIcon from '@mui/icons-material/Add';

import AdminNavigationBar from "@/js/components/admin/header/AdminNavigationBar";
import UserContainer from "@/js/components/admin/users/UserContainer";
import UserFullScreenDialog from "@/js/components/utils/UserFullScreenDialog";

import Action from "@/js/model/Action";
import StyledBottomFab from "@/js/components/styled/StyledBottomFab";

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
