import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { HOME_URL, LOGIN_URL, REGISTER_URL } from "../constants/UrlConstants";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<Home />} errorElement={<NotFound />} />
      <Route path={LOGIN_URL} element={<Login />} />
      <Route path={REGISTER_URL} element={<Register />} />
    </>
  )
);
