import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { getProduct } from "@/js/api/service/ProductService";
import {
  HOME_URL,
  LOGIN_URL,
  PRODUCT_URL,
  REGISTER_URL,
  CART_URL,
  CART_CHECKOUT_URL,
  CART_ORDER_URL,
  COMPARE_URL,
  NAVIGATE_PRODUCTS_URL,
  FAVORITES_URL,
  ADMIN_URL,
  PRODUCT_INVENTORY_URL,
  USER_INVENTORY_URL,
  ORDERS_URL,
  ORDER_INVENTORY_URL,
  RESET_PASSWORD_URL,
  FORGOT_PASSWORD_URL,
  CONTACTS_URL
} from "@/js/constants/UrlConstants";

import AdminPage from "@/js/pages/admin/AdminPage";
import ProductInventoryPage from "@/js/pages/admin/ProductInventoryPage";
import UserInventoryPage from "@/js/pages/admin/UserInventoryPage";
import Compare from "@/js/pages/Compare";
import Favorites from "@/js/pages/Favorites";
import Home from "@/js/pages/Home";
import Login from "@/js/pages/Login";
import NotFound from "@/js/pages/NotFound";
import ProductPage from "@/js/pages/ProductPage";
import Products from "@/js/pages/Products";
import Register from "@/js/pages/Register";
import CartItemsPage from "@/js/pages/CartItemsPage";
import CartOrderInformationPage from "@/js/pages/CartOrderInformationPage";
import CartCheckoutPage from "@/js/pages/CartCheckoutPage";
import Orders from "@/js/pages/Orders";
import OrderInventoryPage from "@/js/pages/admin/OrderInventoryPage";
import ResetPasswordPage from "@/js/pages/ResetPasswordPage";
import ForgotPasswordPage from "@/js/pages/ForgotPasswordPage";
import Contacts from "@/js/pages/Contacts";
import ErrorBoundary from "@/js/components/utils/ErrorBoundary";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<Home/>} errorElement={<NotFound/>}/>
      <Route path={LOGIN_URL} element={<Login />}/>
      <Route path={REGISTER_URL} element={<Register />}/>
      <Route 
        path={PRODUCT_URL}
        loader={({ params }) => getProduct(params.name)}
        element={<ProductPage />}
        errorElement={<ErrorBoundary/>}
      />
      <Route path={NAVIGATE_PRODUCTS_URL} element={<Products/>}/>
      <Route path={CART_URL} element={<CartItemsPage/>}/>
      <Route path={CART_ORDER_URL} element={<CartOrderInformationPage/>}/>
      <Route path={CART_CHECKOUT_URL} element={<CartCheckoutPage/>}/>
      <Route path={COMPARE_URL} element={<Compare />}/>
      <Route path={FAVORITES_URL} element={<Favorites />}/>
      <Route path={ADMIN_URL} element={<AdminPage />}/>
      <Route path={PRODUCT_INVENTORY_URL} element={<ProductInventoryPage />}/>
      <Route path={USER_INVENTORY_URL} element={<UserInventoryPage />}/>
      <Route path={ORDERS_URL} element={<Orders />}/>
      <Route path={ORDER_INVENTORY_URL} element={<OrderInventoryPage/>}/>
      <Route path={RESET_PASSWORD_URL} element={<ResetPasswordPage/>}/>
      <Route path={FORGOT_PASSWORD_URL} element={<ForgotPasswordPage/>}/>
      <Route path={CONTACTS_URL} element={<Contacts/>}/>
    </>
  )
);
