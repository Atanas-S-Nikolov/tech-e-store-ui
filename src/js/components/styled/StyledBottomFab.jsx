import { styled } from "@mui/system";

import Fab from "@mui/material/Fab"

export default function StyledBottomFab(props) {
  const StyledFab = styled(Fab)(() => ({
    position: "fixed",
    float: "right",
    bottom: "3%",
    right: "1%"
  }));

  return (
    <StyledFab color='primary' {...props}>
      {props.children}
    </StyledFab>
  );
}
