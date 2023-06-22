import styled from '@emotion/styled';
import Radio from '@mui/material/Radio';

const StyledRadio = styled(Radio)(() => ({
  ".MuiSvgIcon-root": {
    color: 'white',
  },
}));

export default function StyledRadioButton(props) {
  return (
    <StyledRadio {...props}/>
  );
}
