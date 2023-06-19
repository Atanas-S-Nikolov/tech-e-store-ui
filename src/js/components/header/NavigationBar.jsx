import "@/styles/menu/NavigationBar.css";

import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import ShopIcon from '@mui/icons-material/Shop';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import { ADMIN_URL, CART_URL, COMPARE_URL, FAVORITES_URL, HOME_URL, LOGIN_URL, ORDERS_URL } from '@/js/constants/UrlConstants';
import StyledLink from "@/js/components/styled/StyledLink";
import CustomSwipeableDrawer from './CustomSwipeableDrawer';
import CustomBadge from "@/js/components/utils/CustomBadge";
import SnackbarMessage from "@/js/components/utils/SnackbarMessage";
import { UNAUTHENTICATED_MESSAGE } from '@/js/constants/MessageConstants';

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutReducer } from "@/js/redux/authenticationSlice";
import { resetCompareStateReducer } from "@/js/redux/productCompareSlice";
import { resetCartReducer } from "@/js/redux/cartSlice";
import { deleteCart } from "@/js/api/service/CartService";
import { Divider } from "@mui/material";
import { isNotBlank } from "@/js/utils/StringUtils";
import SearchBar from "@/js/components/header/SearchBar";

export default function NavigationBar() {
  const { isAuthenticated, role } = useSelector(state => state.authentication);
  const { products: comparedProducts } = useSelector(state => state.productCompare);
  const { products: favoriteProducts } = useSelector(state => state.favorites);
  const { cartResponse } = useSelector(state => state.cart);
  const { key, products: cartProducts } = cartResponse;
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isAdmin = role === import.meta.env.VITE_ADMIN_ROLE;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateToOrders}>
        My orders
      </MenuItem>
      <Divider/>
      {
        isAdmin
          ? <MenuItem onClick={navigateToAdminPanel}>
              <ListItemIcon>
                <AdminPanelSettingsIcon/>
              </ListItemIcon>
              Admin panel
            </MenuItem>
          : null
      }
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isDrawerOpen ? <CustomSwipeableDrawer onClose={handleDrawerClose}/> : null}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <StyledLink to={HOME_URL}>
            <ShopIcon fontSize="small" sx={{ mr: 1 }}/>
            <Typography
              variant="h6"
              edge="start"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Tech E-Store
            </Typography>
          </StyledLink>
          <SearchBar/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={navigateToCompare}
            >
              <CustomBadge badgeContent={comparedProducts.length}>
                <CompareArrowsIcon />
              </CustomBadge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={navigateToFavorites}
            >
              <CustomBadge badgeContent={favoriteProducts.length}>
                <FavoriteIcon />
              </CustomBadge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={navigateToCart}
            >
              <CustomBadge badgeContent={cartProducts?.length || 0}>
                <ShoppingCartIcon />              
              </CustomBadge>
            </IconButton>
            {
              isAuthenticated 
                ? (
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  ) 
                : (
                    <StyledLink to={LOGIN_URL}>
                      <Typography component="div">LOGIN</Typography>
                    </StyledLink>
                  )
            }
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {
        hasError 
          ? <SnackbarMessage severity="error" message={errorMessage} afterErrorCallback={handleHasErrorFalse}/> 
          : null
      }
    </Box>
  );

  function navigateToCart() {
    navigate(CART_URL);
  }

  function navigateToCompare() {
    navigate(COMPARE_URL);
  }

  function navigateToFavorites() {
    if (!isAuthenticated) {
      setErrorMessage(UNAUTHENTICATED_MESSAGE);
      setHasError(true);
      return;
    }
    navigate(FAVORITES_URL);
  }

  function navigateToAdminPanel() {
    handleMenuClose();
    navigate(ADMIN_URL);
  }

  function navigateToOrders() {
    handleMenuClose();
    navigate(ORDERS_URL);
  }

  function handleHasErrorFalse() {
    setHasError(false);
    setErrorMessage("");
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  };

  function handleDrawerOpen() {
    setIsDrawerOpen(true);
  }

  function handleDrawerClose() {
    setIsDrawerOpen(false);
  }

  async function handleLogout() {
    // order matters
    handleMenuClose();
    dispatch(resetCompareStateReducer());
    if (isNotBlank(key)) {
      await deleteCart(key);
    }
    dispatch(resetCartReducer());
    dispatch(logoutReducer());
    navigate(HOME_URL);
  }
}
