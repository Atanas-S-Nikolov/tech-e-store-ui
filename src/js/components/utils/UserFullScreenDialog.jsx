import { useState, forwardRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import CloseIcon from '@mui/icons-material/Close';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';

import CustomFormTextInput from './CustomFormTextInput';
import CustomFormPasswordInput from './CustomFormPasswordInput';
import SnackbarMessage from './SnackbarMessage';
import Action from '../../model/Action';
import { createUser, updateUser } from '../../api/service/UserService';
import UserDto from '../../model/user/UserDto';
import CustomFormSelect from './CustomFormSelect';
import {
  EMAIL_PROPERTY, 
  FIRST_NAME_PROPERTY, 
  LAST_NAME_PROPERTY, 
  PASSWORD_PROPERTY, 
  ROLE_PROPERTY, 
  USERNAME_PROPERTY
} from '../../constants/PropertyConstants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserFullScreenDialog({ open, handleClose, action, user = {} }) {
  const roles = [import.meta.env.VITE_ADMIN_ROLE, import.meta.env.VITE_CUSTOMER_ROLE];
  const isActionCreate = Action.CREATE === action;
  const isActionUpdate = Action.UPDATE === action;
  const usernameTextFieldStyle = isActionCreate ? { mr: 1 } : { mr: 1, width: "82ch" };

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);

  // error state
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [hasRoleError, setHasRoleError] = useState(false);
  const [roleErrorMessage, setRoleErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIsSavedFailed = () => {
    setIsSavedSuccessfully(false);
  }

  function handleHasErrorFalse() {
    setHasError(false);
  }

  function resetBackendErrorState() {
    setUsernameErrorMessage("");
    setHasUsernameError(false);
    setFirstNameErrorMessage("");
    setHasFirstNameError(false);
    setLastNameErrorMessage("");
    setHasLastNameError(false);
    setEmailErrorMessage("");
    setHasEmailError(false);
    setRoleErrorMessage("");
    setHasRoleError(false);
    handleHasErrorFalse();
  }

  function setBackendErrorState(property, message) {
    switch(property) {
      case USERNAME_PROPERTY:
        setUsernameErrorMessage(message);
        setHasUsernameError(true);
        break;
      case PASSWORD_PROPERTY:
        setPasswordErrorMessage(message);
        setHasPasswordError(true);
        break;
      case FIRST_NAME_PROPERTY:
        setFirstNameErrorMessage(message);
        setHasFirstNameError(true);
        break;
      case LAST_NAME_PROPERTY:
        setLastNameErrorMessage(message);
        setHasLastNameError(true);
        break;
      case EMAIL_PROPERTY:
        setEmailErrorMessage(message);
        setHasEmailError(true);
        break;
      case ROLE_PROPERTY:
        setRoleErrorMessage(message);
        setHasRoleError(true);
        break;
      default:
        console.log("No one property was recognized!");
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    try {
      const userDto = new UserDto(firstName, lastName, email, phone, username, password, null, role);
      if (isActionCreate) {
        await createUser(userDto);
      } else if(isActionUpdate) {
        await updateUser(userDto);
      } else {
        console.log("Action did not match!");
      }
      setIsSavedSuccessfully(true);
      setTimeout(handleClose(), 6000);
    } catch(error) {
      const response = error.response;
      const status = response.status;
      if (status === 400) {
        const { rejectedProperties, messages } = response.data;
        console.log(response)
        resetBackendErrorState();

        if (messages) {
          messages.forEach(message => {
            if (message.includes(PASSWORD_PROPERTY)) {
              rejectedProperties.push({ property: PASSWORD_PROPERTY, message: message });
            }
          })
        }

        rejectedProperties.forEach(rejected => {
          const { property, message } = rejected;
          setBackendErrorState(property, message);
        });
      } else if (status === 404 | 409) {
        setErrorMessage(response.data.messages[0]);
        setHasError(true);
      }
    }
  }

  useEffect(() => {
    if (isActionCreate) {
      setTitle("Create user");
    } else if(isActionUpdate) {
      setTitle("Edit user");
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
      }
    } else {
      console.log("Action did not match!");
    }
  }, [user, isActionCreate, isActionUpdate])

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
            id="username"
            label="Username"
            required
            error={hasUsernameError}
            errorMessage={usernameErrorMessage}
            value={username}
            onChange={event => setUsername(event.target.value)}
            sx={usernameTextFieldStyle}
          />
          {
            isActionCreate
              ? <CustomFormPasswordInput
                  id="password"
                  label="Password"
                  error={hasPasswordError}
                  errorMessage={passwordErrorMessage}
                  required
                  onChange={event => setPassword(event.target.value)}
                  sx={{ ml: 1 }}
                />
              : null
          }
          
        </div>
        <div>
          <CustomFormTextInput
            id="first-name"
            label="First name"
            required
            error={hasFirstNameError}
            errorMessage={firstNameErrorMessage}
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="last-name"
            label="Last name"
            required
            error={hasLastNameError}
            errorMessage={lastNameErrorMessage}
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="email"
            label="Email"
            adornment={<AlternateEmailIcon/>}
            required
            error={hasEmailError}
            errorMessage={emailErrorMessage}
            value={email}
            onChange={event => setEmail(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="phone"
            label="Phone"
            adornment={<PhoneIcon/>}
            value={phone}
            onChange={event => setPhone(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        {
          isActionCreate
            ? <CustomFormSelect
                id="role"
                label="Role"
                lableId="role-label-id"
                required
                error={hasRoleError}
                errorMessage={roleErrorMessage}
                value={role}
                values={roles}
                onChange={(event) => setRole(event.target.value)}
              />
            : null
        }
        
      </Box>
      {
        isSavedSuccessfully 
          ? <SnackbarMessage message="User is saved!" afterCloseCallback={handleIsSavedFailed}/>
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
