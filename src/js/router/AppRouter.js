import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { getProduct } from "../api/service/ProductService";
import {
  HOME_URL,
  LOGIN_URL,
  PRODUCT_URL,
  REGISTER_URL,
  CART_URL,
  COMPARE_URL,
  NAVIGATE_PRODUCTS_URL,
  FAVORITES_URL,
  ADMIN_URL,
  PRODUCT_INVENTORY_URL,
  USER_INVENTORY_URL
} from "../constants/UrlConstants";
import AdminPage from "../pages/admin/AdminPage";
import ProductInventoryPage from "../pages/admin/ProductInventoryPage";
import UserInventoryPage from "../pages/admin/UserInventoryPage";
import Cart from "../pages/Cart";
import Compare from "../pages/Compare";
import Favorites from "../pages/Favorites";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/ProductPage";
import Products from "../pages/Products";
import Register from "../pages/Register";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<Home/>} errorElement={<NotFound/>}/>
      <Route path={LOGIN_URL} element={<Login />}/>
      <Route path={REGISTER_URL} element={<Register />}/>
      <Route path={PRODUCT_URL} element={<ProductPage />} loader={({ params }) => getProduct(params.name)}/>
      <Route path={NAVIGATE_PRODUCTS_URL} element={<Products/>}/>
      <Route path={CART_URL} element={<Cart/>}/>
      <Route path={COMPARE_URL} element={<Compare />}/>
      <Route path={FAVORITES_URL} element={<Favorites />}/>
      <Route path={ADMIN_URL} element={<AdminPage />}/>
      <Route path={PRODUCT_INVENTORY_URL} element={<ProductInventoryPage />}/>
      <Route path={USER_INVENTORY_URL} element={<UserInventoryPage />}/>\
    </>
  )
);
