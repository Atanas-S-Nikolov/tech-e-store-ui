import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from '@mui/material/FormControl';

import StyledFormErrorText from "@/js/components/styled/StyledFormErrorText";

export default function CustomFormTextInput({ id, label, value, adornment, sx, required = false, disabled = false,
  error, errorMessage, onChange}) {
  return (
    <FormControl
      margin='normal'
      error={error}
      required={required}
      disabled={disabled}
      sx={{ width: "40ch", ...sx}}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        type="text"
        label={label}
        onChange={onChange}
        endAdornment={
          adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : null
        }
      />
      <StyledFormErrorText id="input-error-text">{errorMessage}</StyledFormErrorText>
    </FormControl>
  );
}