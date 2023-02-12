import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ProductTypeMenu from './ProductTypeMenu';
import { categoriesItems } from '../../utils/categories';

export default function CustomSwipeableDrawer({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const toggleDrawer = (event) => {
    event.preventDefault();
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (isOpen) {
      onClose();
    }

    setIsOpen(prevState => !prevState);
  };

  const toggleSubMenu = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    setSubMenuOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  }

  const toggleMenu = (event, id) => {
    toggleSubMenu(event, id);
    toggleDrawer(event);
  }

  const { isAuthenticated } = useSelector(state => state.authentication);
  const navigate = useNavigate();
  
  const navigateToProductsByCategory = (event, id, category) => {
    const url = isAuthenticated ? `/product?category=${category}` : `/product?early_access=false&category=${category}`;
    toggleMenu(event, id);
    navigate(url);
  }

  const navigateToProductsByType = (event, id, type) => {
    const url = isAuthenticated ? `/product?type=${type}` : `/product?early_access=false&type=${type}`;
    toggleMenu(event, id);
    navigate(url);
  }

  const renderItems = () => (
    <Box
      sx={{ width: 'auto'}}
      role="presentation"
    >
      <List>
        {categoriesItems.map(({ id, icon, text, productTypes }, index) => (
          <>
            <ListItem key={crypto.randomUUID()} disablePadding>
              <ListItemButton
                onClick={(event, id) => navigateToProductsByCategory(event, id, text)}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
                <IconButton onClick={(event) => toggleSubMenu(event, id)} disableRipple>
                  {subMenuOpen[id] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
              </ListItemButton>
            </ListItem>
            {(index < categoriesItems.length - 1) ? <Divider /> : null}
            {subMenuOpen[id]
              ? <ProductTypeMenu
                  isOpen={subMenuOpen[id]}
                  itemId={id}
                  items={productTypes}
                  itemOnClick={navigateToProductsByType}
                />
              : null
            }
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {renderItems()}
      </SwipeableDrawer>
    </div>
  );
}