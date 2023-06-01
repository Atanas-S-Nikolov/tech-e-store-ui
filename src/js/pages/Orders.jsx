import Typography from '@mui/material/Typography';

import AppFooter from "@/js/components/footer/AppFooter";
import NavigationBar from "@/js/components/menu/NavigationBar";
import CollapsiblePaginationTable from "@/js/components/utils/CollapsiblePaginationTable";

import UsernameDto from "@/js/model/auth/UsernameDto";
import { getAllOrdersForUser } from "@/js/api/service/OrderService";

import { useSelector } from "react-redux";

export default function Orders() {
  const { username } = useSelector(state => state.authentication);
  const columns = [
    { id: 'id', label: 'ID', minWidth: 170},
    { id: 'date', label: 'Date', minWidth: 170 },
    {
      id: 'totalPrice',
      label: 'Total price',
      format: (value) => `${value.toFixed(2)} lv`,
      minWidth: 170
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170
    },
  ];

  return (
    <>
      <NavigationBar/>
      <div className="centered-container">
        <Typography variant='h3' sx={{ mt: 3 }}>Orders</Typography>
        <CollapsiblePaginationTable columns={columns} request={getAllOrdersForUser(new UsernameDto(username))}/>
      </div>
      <AppFooter/>
    </>
  );
}