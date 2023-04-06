import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import PersonIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import SnackbarMessage from '@/js/components/utils/SnackbarMessage';
import UserFullScreenDialog from '@/js/components/utils/UserFullScreenDialog';
import Action from '@/js/model/Action';

export default function UserPreview({ user }) {
  const { username } = user;
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isUserSuspended, setIsUserSuspended] = useState(false);
  const [isActionPerformedOnUser, setIsActionPerformedOnUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleUpdateDialogOpen = () => {
    setIsUpdateDialogOpen(true);
  }

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  }

  const handleSuspendDialogOpen = () => {
    setIsSuspendDialogOpen(true);
  }

  const handleSuspendDialogClose = (event) => {
    event.preventDefault();
    setIsSuspendDialogOpen(false);
  }

  const openEditDialog = (event) => {
    event.preventDefault();
    handleUpdateDialogOpen();
  }

  const openSuspendDialog = (event) => {
    event.preventDefault();
    handleSuspendDialogOpen();
  }

  const resetErrorState = () => {
    setHasError(false);
    setErrorMessage("");
  }

  const handleIsActionPerformedOnUserTrue = () => {
    setIsActionPerformedOnUser(true);
  }

  const handleIsActionPerformedOnUserFalse = () => {
    setIsActionPerformedOnUser(false);
  }

  const suspendUser = (event) => {
    setIsUserSuspended(true);
    handleSuspendDialogClose(event);
    handleIsActionPerformedOnUserTrue();
  }

  const resumeUser = (event) => {
    setIsUserSuspended(false);
    handleSuspendDialogClose(event);
    handleIsActionPerformedOnUserTrue();
  }

  const suspendButtonColor = () => {
    if (isUserSuspended) return "warning"
  }

  const actionButtons = [
    { text: "Edit", icon: <EditIcon/>, onClick: openEditDialog },
    { 
      text: isUserSuspended ? "Resume" :"Suspend",
      icon: isUserSuspended ? <PlayCircleOutlineIcon/> : <StopCircleOutlinedIcon/>,
      onClick: isUserSuspended ? resumeUser : openSuspendDialog,
      color: suspendButtonColor()
    }
  ];

  return (
    <div className='centered-column-container'>
      <PersonIcon className='icon' sx={{ fontSize: '100px', color: 'lightgrey' }}/>
      <Typography variant='h5' color='text.secondary' sx={{ mr: 10 }}>{username}</Typography>
      {actionButtons.map(button => 
        <Button
          key={crypto.randomUUID()}
          variant="text"
          startIcon={button.icon}
          onClick={button.onClick}
          color={button.color ?? "primary"}
        >
          {button.text}
        </Button>
      )}
      <UserFullScreenDialog
        open={isUpdateDialogOpen}
        handleClose={handleUpdateDialogClose}
        action={Action.UPDATE}
        user={user}
      />
      <Dialog open={isSuspendDialogOpen}>
        <DialogTitle>User will be suspended for 24 hours!</DialogTitle>
        <DialogActions>
          <Button onClick={handleSuspendDialogClose}>Close</Button>
          <Button onClick={suspendUser} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
      {
        isActionPerformedOnUser
          ? <SnackbarMessage
             message={isUserSuspended ? "User is suspended!" : "User now can interact with the Tech E-Store"}
             afterCloseCallback={handleIsActionPerformedOnUserFalse}
            />
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