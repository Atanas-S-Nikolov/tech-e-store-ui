import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export default function AppFooter() {

  const StyledFooter = styled('footer')(() => ({
    position: "relative",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    color: "gray"
  }));

  return(
    <StyledFooter>
      <Typography variant="body2">@ 2023 Tech E-Store. All rights reserved.</Typography>
    </StyledFooter>
  );  
}