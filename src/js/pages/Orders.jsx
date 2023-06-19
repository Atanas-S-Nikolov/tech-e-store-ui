import Typography from '@mui/material/Typography';

import AppFooter from "@/js/components/footer/AppFooter";
import NavigationBar from "@/js/components/header/NavigationBar";
import OrderPaginationTable from "@/js/components/orders/OrderPaginationTable";

import UsernameDto from "@/js/model/auth/UsernameDto";
import { getAllOrdersForUser } from "@/js/api/service/OrderService";

import { useSelector } from "react-redux";

export default function Orders() {
  const { username } = useSelector(state => state.authentication);

  return (
    <>
      <NavigationBar/>
      <div className="centered-container">
        <Typography variant='h3' sx={{ mt: 3 }}>Orders</Typography>
        <OrderPaginationTable request={getAllOrdersForUser(new UsernameDto(username))} sx={{ mt: 10 }}/>
      </div>
      <AppFooter/>
    </>
  );
}