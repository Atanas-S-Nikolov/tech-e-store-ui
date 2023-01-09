import { styled } from '@mui/system';

import Button from '@mui/material/Button';

export default function StyledFormButton(props) {
  const FormButton = styled(Button)(() => ({
    height: "55px",
  }));

  return (
    <FormButton variant='contained' size='large' disableElevation {...props}/>
  );
}