import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import StyledFormErrorText from "../styled/StyledFormErrorText";

export default function CustomFormPasswordInput({ id, label, sx, error, errorMessage, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl margin='normal' sx={{ width: "40ch", ...sx }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={showPassword ? 'text' : 'password'}
        required
        error={error}
        onChange={onChange}
        endAdornment={
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />
      <StyledFormErrorText id="input-password-error-text">{errorMessage}</StyledFormErrorText>
    </FormControl>
  );
}