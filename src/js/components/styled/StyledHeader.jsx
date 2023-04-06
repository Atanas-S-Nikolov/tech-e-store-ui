import Typography from '@mui/material/Typography';
import ShopIcon from '@mui/icons-material/Shop';
import { styled } from "@mui/system";

import StyledLink from "./StyledLink";

import { HOME_URL } from "@/js/constants/UrlConstants";

export default function StyledHeader(props) {
  const StyledDiv = styled('div')(({ theme }) => ({
    display: "grid",
    placeItems: "center",
    width: "100%",
    backgroundColor: theme.palette.primary.main
  }));

  return (
    <StyledDiv {...props}>
      <StyledLink
          to={HOME_URL}
          sx={{ width: "fit-content", color: "primary.contrastText" }}
        >
          <ShopIcon fontSize='large'/>
          <Typography variant='h2'>Tech E-Store</Typography>
        </StyledLink>
    </StyledDiv>
  );
}