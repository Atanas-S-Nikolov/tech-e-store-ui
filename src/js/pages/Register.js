import "../../styles/pages/Login.css";

import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';

import StyledFormControl from '../components/styled/StyledFormControl';
import AppFooter from '../components/footer/AppFooter';
import StyledFormButton from "../components/styled/StyledFormButton";
import CustomFormTextInput from "../components/utils/CustomFormTextInput";
import CustomFormPasswordInput from "../components/utils/CustomFormPasswordInput";
import StyledHeader from "../components/styled/StyledHeader";

export default function Register() {
  const passwordId = "password";
  const confirmPasswordId = "confirm-password";

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
          sx={{ mt: 10, width: "82ch" }}
        />
        <div>
          <CustomFormTextInput
            id="first-name"
            label="First name"
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="last-name"
            label="Last name"
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormTextInput
            id="email"
            label="Email"
            adornment={<AlternateEmailIcon/>}
            sx={{ mr: 1 }}
          />
          <CustomFormTextInput
            id="phone"
            label="Phone"
            adornment={<PhoneIcon/>}
            sx={{ ml: 1 }}
          />
        </div>
        <div>
          <CustomFormPasswordInput
            id={passwordId}
            label="Password"
            sx={{ mr: 1 }}
          />
          <CustomFormPasswordInput
            id={confirmPasswordId}
            label="Confirm password"
            sx={{ ml: 1 }}
          />
        </div>
        <StyledFormControl sx={{ width: "82ch" }}>
          <div>
            <StyledFormButton 
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