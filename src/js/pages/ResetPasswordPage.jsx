import { useState } from "react";

import Typography from "@mui/material/Typography";

import StyledHeader from "@/js/components/styled/StyledHeader";
import StyledFormControl from "@/js/components/styled/StyledFormControl";
import StyledFormButton from "@/js/components/styled/StyledFormButton";
import CustomFormPasswordInput from "@/js/components/utils/CustomFormPasswordInput";
import CustomFormTextInput from "@/js/components/utils/CustomFormTextInput";
import SnackbarMessage from "@/js/components/utils/SnackbarMessage";
import AppFooter from "@/js/components/footer/AppFooter";

import { resetPassword } from "@/js/api/service/AuthService";
import ResetPasswordDto from "@/js/model/auth/ResetPasswordDto";

import { isBlank } from "underscore.string";
import { validatePassword } from "@/js/utils/PasswordValidator";
import { PASSWORD_PROPERTY, TOKEN_PROPERTY } from "@/js/constants/PropertyConstants";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const [isSnackbarMessageVisible, setIsSnackbarMessageVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [hasPasswordResetTokenError, setHasPasswordResetTokenError] = useState(false);
  const [passwordResetTokenErrorMessage, setPasswordResetTokenErrorMessage] = useState("");

  return (
    <>
      <StyledHeader/>
      <div className="centered-container">
        <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>Reset password</Typography>
        <Typography>Please enter your new password</Typography>
        <CustomFormPasswordInput
          id="password"
          label="Password"
          error={hasPasswordError}
          errorMessage={passwordErrorMessage}
          onChange={handlePasswordChange}
        />
        <CustomFormPasswordInput
          id="confirm-password"
          label="Confirm password"
          error={hasConfirmPasswordError}
          errorMessage={confirmPasswordErrorMessage}
          onChange={handleConfirmPasswordChange}
        />
        <CustomFormTextInput
          id="password-reset-token"
          label="Password reset token"
          required
          error={hasPasswordResetTokenError}
          errorMessage={passwordResetTokenErrorMessage}
          onChange={handlePasswordResetTokenChange}
        />
        <StyledFormControl onClick={handlePasswordReset}>
          <StyledFormButton>Reset</StyledFormButton>
        </StyledFormControl>
      </div>
      {
        isSnackbarMessageVisible
          ? <SnackbarMessage message={snackbarMessage} afterCloseCallback={handleCloseSnackbar}/>
          : null
      }
      {
        hasError
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/>
          : null
      }
      <AppFooter/>
    </>
  );

  function handleCloseSnackbar() {
    setIsSnackbarMessageVisible(false);
    setSnackbarMessage("");
  }

  function handleHasErrorFalse() {
    setHasError(false);
    setErrorMessage("");
  }

  function handlePasswordChange(event) {
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

  function handleConfirmPasswordChange(event) {
    const value = event.target.value;
    if (password !== value && value.length !== 0) {
      setConfirmPasswordErrorMessage("Confirmed password should be the same as password");
      setHasConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordErrorMessage("");
    setHasConfirmPasswordError(false);
  }

  function handlePasswordResetTokenChange(event) {
    const value = event.target.value;
    if (isBlank(value)) {
      setPasswordResetTokenErrorMessage("Reset token must not be blank");
      setHasPasswordResetTokenError(true);
      return;
    }
    setPasswordResetTokenErrorMessage("");
    setHasPasswordResetTokenError(false);
    setPasswordResetToken(value);
  }

  function handlePasswordReset() {
    resetBackendErrorState();
    resetPassword(new ResetPasswordDto(password, passwordResetToken))
      .then(response => {
        setErrorMessage("");
        setHasError(false);
        setSnackbarMessage(response.data.message);
        setIsSnackbarMessageVisible(true);
      }).catch(error => {
        const { status, data } = error.response;
        if (status === 400) {
          const { rejectedProperties } = data;
          rejectedProperties.forEach(rejected => {
            const { property, message } = rejected;
            setBackendErrorState(property, message)
          })
        } else if (status === 401 || status === 404) {
          setErrorMessage(data.messages[0]);
          setHasError(true);
        }
        console.log(error);
      })
  }

  function resetBackendErrorState() {
    setPasswordErrorMessage("");
    setHasPasswordError(false);
    setPasswordResetTokenErrorMessage("");
    setHasPasswordResetTokenError(false);
  }

  function setBackendErrorState(property, message) {
    switch(property) {
      case PASSWORD_PROPERTY:
        setPasswordErrorMessage(message);
        setHasPasswordError(true);
        break;
      case TOKEN_PROPERTY:
        setPasswordResetTokenErrorMessage(message);
        setHasPasswordResetTokenError(true);
        break;
      default:
        console.log("No one property was recognized!");
    }
  }
}
