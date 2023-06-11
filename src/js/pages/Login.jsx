import { useState } from "react";

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { HOME_URL, REGISTER_URL, FORGOT_PASSWORD_URL } from '@/js/constants/UrlConstants';
import StyledFormControl from '@/js/components/styled/StyledFormControl';
import StyledFormButton from "@/js/components/styled/StyledFormButton";
import CustomFormTextInput from "@/js/components/utils/CustomFormTextInput";
import AppFooter from '@/js/components/footer/AppFooter';
import CustomFormPasswordInput from "@/js/components/utils/CustomFormPasswordInput";
import StyledHeader from "@/js/components/styled/StyledHeader";
import AuthenticationDto from "@/js/model/auth/AuthenticationDto";
import { login } from "@/js/api/service/AuthService";

import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { loginReducer, logoutReducer } from "@/js/redux/authenticationSlice";
import { useDispatch } from "react-redux";

function extractUsername(str) {
  const word = "Username";
  const startIndex = str.indexOf(word) + word.length + 1;
  const endIndex = str.indexOf(",");
  return str.substring(startIndex, endIndex);
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Box className="centered-container">
        <StyledHeader />
        <CustomFormTextInput
          id="username"
          label="Username"
          required
          onChange={event => setUsername(event.target.value)}
          sx={{ mt: 10 }}
        />
        <CustomFormPasswordInput
          id="password"
          label="Password"
          onChange={event => setPassword(event.target.value)}
        />
        <Typography>
          <Link
            className="link"
            to={`../${FORGOT_PASSWORD_URL}`}
          >
            Forgot password?
          </Link>
        </Typography>
        <StyledFormControl onClick={loginUser}>
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

  function loginUser() {
    login(new AuthenticationDto(username, password))
    .then(response => {
      const { accessToken, refreshToken } = response.data;
      const decodedJwt = jwt_decode(accessToken);
      dispatch(loginReducer({
        username: extractUsername(decodedJwt.sub),
        role: decodedJwt.roles[0],
        accessToken: accessToken,
        refreshToken: refreshToken
      }));
      navigate(HOME_URL);
    })
    .catch(error => {
      dispatch(logoutReducer());
      console.log(error);
    });
  }
}