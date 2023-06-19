import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"
import Icon from "@mui/material/Icon";

import styled from "@emotion/styled";

import AdminNavigationBar from "@/js/components/admin/header/AdminNavigationBar";
import StyledGridContainer from "@/js/components/styled/StyledGridContainer";
import StyledCardText from "@/js/components/styled/StyledCardText";
import AppFooter from "@/js/components/footer/AppFooter";

import { PRODUCT_INVENTORY_URL, USER_INVENTORY_URL, ORDER_INVENTORY_URL } from "@/js/constants/UrlConstants";

import { useNavigate } from "react-router-dom";

const CustomCard = styled(Card)(() => ({
  display: 'grid',
  placeItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0px 0px 10px gray'
  }
}));

const CardIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 100
}));

export default function AdminPage() {
  const navigate = useNavigate();
  const cards = [
    { icon: 'category', text: 'Product Inventory', onClick: navigateToProductInventory },
    { icon: 'people', text: 'User Inventory', onClick: navigateToUserInventory },
    { icon: 'local_mall', text: 'Order Inventory', onClick: navigateToOrderInventory },
  ];

  return (
    <>
      <AdminNavigationBar/>
      <StyledGridContainer gridTemplateColumns='repeat(3, 1fr)' gap={10}>
        {cards.map(card => {
          const { icon, text, onClick } = card;
          return (
            <CustomCard key={crypto.randomUUID()} onClick={onClick}>
              <CardContent>
                <CardIcon>{icon}</CardIcon>
              </CardContent>
              <StyledCardText>{text}</StyledCardText>
            </CustomCard>
          );
        })}
      </StyledGridContainer>
      <AppFooter/>
    </>
  )

  function navigateToProductInventory(event) {
    event.preventDefault();
    navigate(PRODUCT_INVENTORY_URL);
  }

  function navigateToUserInventory(event) {
    event.preventDefault();
    navigate(USER_INVENTORY_URL);
  }

  function navigateToOrderInventory(event) {
    event.preventDefault();
    navigate(ORDER_INVENTORY_URL);
  }
}