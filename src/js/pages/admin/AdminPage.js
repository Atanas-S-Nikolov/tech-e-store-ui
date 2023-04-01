import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"
import Icon from "@mui/material/Icon";

import styled from "@emotion/styled";

import AdminNavigationBar from "../../components/admin/header/AdminNavigationBar";
import StyledGridContainer from "../../components/styled/StyledGridContainer";
import StyledCardText from "../../components/styled/StyledCardText";
import { PRODUCT_INVENTORY_URL, USER_INVENTORY_URL } from "../../constants/UrlConstants";

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

  const navigateToProductInventory = (event) => {
    event.preventDefault();
    navigate(PRODUCT_INVENTORY_URL);
  }

  const navigateToUserInventory = (event) => {
    event.preventDefault();
    navigate(USER_INVENTORY_URL);
  }

  return (
    <>
      <AdminNavigationBar/>
      <StyledGridContainer gridTemplateColumns='repeat(2, 1fr)' gap={10}>
        <CustomCard onClick={navigateToProductInventory}>
          <CardContent>
            <CardIcon>category</CardIcon>
          </CardContent>
          <StyledCardText>Product Inventory</StyledCardText>
        </CustomCard>
        <CustomCard onClick={navigateToUserInventory}>
          <CardContent>
            <CardIcon>people</CardIcon>
          </CardContent>
          <StyledCardText>User Inventory</StyledCardText>
        </CustomCard>
      </StyledGridContainer>
    </>
  )
}