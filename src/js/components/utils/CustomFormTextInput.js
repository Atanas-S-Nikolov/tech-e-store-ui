import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from '@mui/material/FormControl';

export default function CustomFormTextInput({ id, label, adornment, sx , onChange}) {
  return (
    <FormControl margin='normal' sx={{ width: "40ch", ...sx}}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type="text"
        onChange={onChange}
        endAdornment={
          adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : null
        }
      />
    </FormControl>
  );
}