import "../../styles/pages/Login.css";

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import ShopIcon from '@mui/icons-material/Shop';

import { HOME_URL, REGISTER_URL } from '../constants/UrlConstants';
import StyledLink from '../components/styled/StyledLink';
import StyledFormControl from '../components/styled/StyledFormControl';
import StyledFormButton from "../components/styled/StyledFormButton";
import CustomFormTextInput from "../components/utils/CustomFormTextInput";
import AppFooter from '../components/footer/AppFooter';
import CustomFormPasswordInput from "../components/utils/CustomFormPasswordInput";

export default function Login() {
  return (
    <>
      <Box sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center"
        }}
      >
        <StyledLink
          to={HOME_URL}
          sx={{ color: "primary.main" }}
        >
          <ShopIcon fontSize='large'/>
          <Typography variant='h2'>Tech E-Store</Typography>
        </StyledLink>
        <Divider color="primary.main" sx={{width: "100%" }} />
        <CustomFormTextInput
          id="username"
          label="Username"
          sx={{ mt: 10 }}
        />
        <CustomFormPasswordInput
          id="password"
          label="Password"
        />
        <StyledFormControl>
          <StyledFormButton>LOGIN</StyledFormButton>
        </StyledFormControl>
        <Typography component="span">
          You don't have an account?&nbsp;
          <Link
            className="link"
            to={`../${REGISTER_URL}`}
          >
            Register
          </Link>
        </Typography>
      </Box>
      <AppFooter/>
    </>
  );
}