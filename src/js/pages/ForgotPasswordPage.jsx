import { useState } from "react";

import Typography from "@mui/material/Typography";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import StyledHeader from "@/js/components/styled/StyledHeader";
import StyledFormControl from "@/js/components/styled/StyledFormControl";
import StyledFormButton from "@/js/components/styled/StyledFormButton";
import CustomFormTextInput from "@/js/components/utils/CustomFormTextInput";
import SnackbarMessage from "@/js/components/utils/SnackbarMessage";
import AppFooter from "@/js/components/footer/AppFooter";

import { forgotPassword } from "@/js/api/service/UserService";
import EmailDto from "@/js/model/user/EmailDto";
import { EMAIL_PROPERTY } from "@/js/constants/PropertyConstants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSnackbarMessageVisible, setIsSnackbarMessageVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // error state
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <StyledHeader/>
      <div className="centered-container">
        <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>Forgot password</Typography>
        <Typography>Enter email associated with your account and we will send instructions how to reset your password</Typography>
        <CustomFormTextInput
          id="email"
          label="Email"
          adornment={<AlternateEmailIcon/>}
          required
          error={hasError}
          errorMessage={errorMessage}
          onChange={event => setEmail(event.target.value)}
        />
        <StyledFormControl onClick={handleForgotPassword}>
          <StyledFormButton>Send reset instructions</StyledFormButton>
        </StyledFormControl>
      </div>
      {
        isSnackbarMessageVisible
          ? <SnackbarMessage message={snackbarMessage} afterCloseCallback={handleCloseSnackbar}/>
          : null
      }
      <AppFooter/>
    </>
  );

  function handleCloseSnackbar() {
    setIsSnackbarMessageVisible(false);
    setSnackbarMessage("");
  }

  function handleForgotPassword() {
    // reset error state
    setErrorMessage("");
    setHasError(false);
    forgotPassword(new EmailDto(email))
      .then(response => {
        setSnackbarMessage(response.data.message);
        setIsSnackbarMessageVisible(true);
      }).catch(error => {
        const { status, data } = error.response;
        if (status === 400) {
          const { rejectedProperties } = data;
          rejectedProperties.forEach(rejected => {
            const { property, message } = rejected;
            if (property === EMAIL_PROPERTY) {
              setErrorMessage(message);
              setHasError(true);
            }
          })
        }
        handleCloseSnackbar();
        console.log(error);
      })
  }
}