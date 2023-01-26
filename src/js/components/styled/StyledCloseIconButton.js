import { styled } from '@mui/system';

import IconButton from "@mui/material/IconButton";

import CloseIcon from '@mui/icons-material/Close';

export default function StyledCloseIconButton(props) {
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    float: "right",
    '&:hover': {
      color: theme.palette.primary.main
    },
  }));

  return (
    <StyledIconButton disableRipple {...props}>
      <CloseIcon />
    </StyledIconButton>
  );
}