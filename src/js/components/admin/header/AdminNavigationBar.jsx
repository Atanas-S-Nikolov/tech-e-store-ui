import "@/styles/menu/NavigationBar.css";

import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import { ADMIN_URL, HOME_URL, ORDERS_URL } from '@/js/constants/UrlConstants';
import StyledLink from "@/js/components/styled/StyledLink";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutReducer } from "@/js/redux/authenticationSlice";
import { resetCompareStateReducer } from "@/js/redux/productCompareSlice";
import { resetCartReducer } from "@/js/redux/cartSlice";
import { deleteCart } from "@/js/api/service/CartService";
import { isNotBlank } from "@/js/utils/StringUtils";
import { Divider } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AdminNavigationBar() {
  const { cartResponse } = useSelector(state => state.cart);
  const { key } = cartResponse;
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
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
      <MenuItem onClick={navigateToHome}>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        Home
      </MenuItem>
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
      <AppBar position="static">
        <Toolbar>
          <StyledLink to={ADMIN_URL}>
            <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }}/>
            <Typography
              variant="h6"
              edge="start"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Tech E-Store Admin Panel
            </Typography>
          </StyledLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );

  function navigateToHome() {
    navigate(HOME_URL);
  }

  function navigateToOrders() {
    navigate(ORDERS_URL);
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  };

  async function handleLogout() {
    // order matters
    handleMenuClose();
    dispatch(resetCompareStateReducer());
    if (isNotBlank(key)) {
      await deleteCart(key);
    }
    dispatch(resetCartReducer());
    dispatch(logoutReducer());
    navigateToHome();
  }
}