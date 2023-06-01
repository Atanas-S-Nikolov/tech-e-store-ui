import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import StyledFormErrorText from '@/js/components/styled/StyledFormErrorText';

export default function CustomFormSelect({ id, label, labelId, value, values, onChange, sx, required = false, error, errorMessage }) {
  return (
    <FormControl margin='normal' sx={{ width: "40ch", ...sx}}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        error={error}
        required={required}
        onChange={onChange}
      >
        <MenuItem value="">
          <Typography color="text.secondary"><em>None</em></Typography>
        </MenuItem>
        {values.map(val => <MenuItem key={crypto.randomUUID()} value={val}>{val}</MenuItem>)}
      </Select>
      <StyledFormErrorText id="select-error-text">{errorMessage}</StyledFormErrorText>
    </FormControl>
  );
}