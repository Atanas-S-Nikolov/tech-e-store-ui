import "../../styles/pages/Login.css";

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

  const registerUser = () => {
    register(new UserDto(firstName, lastName, email, phone, username, password, confirmPassword))
    .then(response => {
      navigate(HOME_URL);
    })
    .catch(error => console.log(error));
  }

  const navigate = useNavigate();

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
          onChange={event => setUsername(event.target.value)}
          sx={{ mt: 10, width: "82ch" }}
        />
        <div>
          <CustomFormTextInput
            id="first-name"
            label="First name"
            onChange={event => setFirstName(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="last-name"
            label="Last name"
            onChange={event => setLastname(event.target.value)}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="email"
            label="Email"
            adornment={<AlternateEmailIcon/>}
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
            onChange={event => setPassword(event.target.value)}
            sx={{ mr: 1 }}
          />
          <CustomFormPasswordInput
            id={confirmPasswordId}
            label="Confirm password"
            onChange={event => setConfirmPassword(event.target.value)}
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