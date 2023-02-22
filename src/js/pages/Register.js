import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../api/backend";
import UserDto from "../model/user/UserDto";

import Box from '@mui/material/Box';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';

import StyledFormControl from '../components/styled/StyledFormControl';
import AppFooter from '../components/footer/AppFooter';
import StyledFormButton from "../components/styled/StyledFormButton";
import CustomFormTextInput from "../components/utils/CustomFormTextInput";
import CustomFormPasswordInput from "../components/utils/CustomFormPasswordInput";
import StyledHeader from "../components/styled/StyledHeader";
import { HOME_URL } from "../constants/UrlConstants";
import { validatePassword } from "../utils/PasswordValidator";

export default function Register() {
  const passwordId = "password";
  const confirmPasswordId = "confirm-password";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error state
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    register(new UserDto(firstName, lastName, email, phone, username, password, confirmPassword))
    .then(response => {
      navigate(HOME_URL);
    })
    .catch(error => {
      const { response } = error;
      if (response.status === 400) {
        const { rejectedProperties } = response.data;
        resetBackendErrorState();

        rejectedProperties.forEach(rejected => {
          const { property, message } = rejected;
          setBackendErrorState(property, message);
        });
      }
    });
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
  }

  function setBackendErrorState(property, message) {
    switch(property) {
      case "username":
        setUsernameErrorMessage(message);
        setHasUsernameError(true);
        break;
      case "firstName":
        setFirstNameErrorMessage(message);
        setHasFirstNameError(true);
        break;
      case "lasName":
        setLastNameErrorMessage(message);
        setHasLastNameError(true);
        break;
      case "email":
        setEmailErrorMessage(message);
        setHasEmailError(true);
        break;
      default:
        console.log("No one property was recognized!");
    }
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const message = validatePassword(value);
    if (message) {
      setPasswordErrorMessage(message);
      setHasPasswordError(true);
      return;
    }
    setPasswordErrorMessage("");
    setHasPasswordError(false);
  }

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    if (password !== value && value.length !== 0) {
      setConfirmPasswordErrorMessage("Confirmed password should be the same as password");
      setHasConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordErrorMessage("");
    setHasConfirmPasswordError(false);
    setConfirmPassword(value);
  }

  return (
    <>
      <Box sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        }}
      >
        <StyledHeader />
        <CustomFormTextInput
          id="username"
          label="Username"
          required
          error={hasUsernameError}
          errorMessage={usernameErrorMessage}
          onChange={event => setUsername(event.target.value)}
          sx={{ mt: 10, width: "82ch" }}
        />
        <div>
          <CustomFormTextInput
            id="first-name"
            label="First name"
            required
            error={hasFirstNameError}
            errorMessage={firstNameErrorMessage}
            onChange={event => setFirstName(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="last-name"
            label="Last name"
            required
            error={hasLastNameError}
            errorMessage={lastNameErrorMessage}
            onChange={event => setLastname(event.target.value)}
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
            onChange={event => setEmail(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="phone"
            label="Phone"
            adornment={<PhoneIcon/>}
            onChange={event => setPhone(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormPasswordInput
            id={passwordId}
            label="Password"
            onChange={handlePasswordChange}
            error={hasPasswordError}
            errorMessage={passwordErrorMessage}
            sx={{ mr: 1 }}
          />
          <CustomFormPasswordInput
            id={confirmPasswordId}
            label="Confirm password"
            onChange={handleConfirmPasswordChange}
            error={hasConfirmPasswordError}
            errorMessage={confirmPasswordErrorMessage}
            sx={{ ml: 1 }}
          />
        </div>
        <StyledFormControl sx={{ width: "82ch" }}>
          <div>
            <StyledFormButton 
              onClick={registerUser}
              sx={{ width: "48.5%", mr: 1 }}
            >
              REGISTER
            </StyledFormButton>
            <StyledFormButton
              onClick={() => navigate(-1)}
              sx={{ width: "48.5%", ml: 1 }}
            >
              CANCEL
            </StyledFormButton>
          </div>
        </StyledFormControl>
      </Box>
      <AppFooter/>
    </>
  );
}