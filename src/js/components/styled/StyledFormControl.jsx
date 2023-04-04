import { styled } from '@mui/system';

import FormControl from '@mui/material/FormControl';

export default function StyledFormControl(props) {
  const CustomFormControl = styled(FormControl)(() => ({
    width: "40ch",
  }));

  return (
    <CustomFormControl margin='normal' {...props}/>
  );
}