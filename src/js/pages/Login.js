

import { useState } from "react";

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { HOME_URL, REGISTER_URL } from '../constants/UrlConstants';
import StyledFormControl from '../components/styled/StyledFormControl';
import StyledFormButton from "../components/styled/StyledFormButton";
import CustomFormTextInput from "../components/utils/CustomFormTextInput";
import AppFooter from '../components/footer/AppFooter';
import CustomFormPasswordInput from "../components/utils/CustomFormPasswordInput";
import StyledHeader from "../components/styled/StyledHeader";
import AuthenticationDto from "../model/auth/AuthenticationDto";
import { login } from "../api/backend";

import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { loginReducer } from "../redux/authenticationSlice";
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

  const loginUser = () => {
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
    .catch(error => console.log(error));
  }

  return (
    <>
      <Box sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center"
        }}
      >
        <StyledHeader />
        <CustomFormTextInput
          id="username"
          label="Username"
          onChange={event => setUsername(event.target.value)}
          sx={{ mt: 10 }}
        />
        <CustomFormPasswordInput
          id="password"
          label="Password"
          onChange={event => setPassword(event.target.value)}
        />
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
}