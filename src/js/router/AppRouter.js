import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { getAllNotEarlyAccessProducts, getCart, getProduct } from "../api/backend";

import { HOME_URL, LOGIN_URL, PRODUCT_URL, REGISTER_URL, CART_URL } from "../constants/UrlConstants";
import Cart from "../pages/Cart";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/ProductPage";
import Register from "../pages/Register";

import UsernameDto from "../model/auth/UsernameDto";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<Home />} errorElement={<NotFound />} loader={getAllNotEarlyAccessProducts}/>
      <Route path={LOGIN_URL} element={<Login />} />
      <Route path={REGISTER_URL} element={<Register />} />
      <Route path={PRODUCT_URL} element={<ProductPage />} loader={({ params }) => getProduct(params.name)}/>
      <Route path={CART_URL} element={<Cart />}/>
      {/* loader={() => getCart(new UsernameDto("user"))} */}
    </>
  )
);