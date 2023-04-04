import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from '@mui/material/FormControl';

import StyledFormErrorText from "../styled/StyledFormErrorText";

export default function CustomFormTextInput({ id, label, value, adornment, sx, required = false, error, errorMessage, onChange}) {
  return (
    <FormControl margin='normal' sx={{ width: "40ch", ...sx}}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        value={value}
        type="text"
        required={required}
        error={error}
        onChange={onChange}
        endAdornment={
          adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : null
        }
      />
      <StyledFormErrorText id="input-error-text">{errorMessage}</StyledFormErrorText>
    </FormControl>
  );
}