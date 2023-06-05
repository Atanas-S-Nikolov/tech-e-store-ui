import OutlinedInput from "@mui/material/OutlinedInput";

import AdminNavigationBar from "@/js/components/admin/header/AdminNavigationBar";
import AppFooter from "@/js/components/footer/AppFooter";
import AdminOrderPaginationTable from "@/js/components/admin/orders/AdminOrderPaginationTable";

import { getAllOrders, getAllOrdersForUser } from "@/js/api/service/OrderService";

import { useDebouncedState } from "@react-hookz/web";
import { isBlank } from "underscore.string";

export default function OrderInventoryPage() {
  const [debouncedRequest, setDebouncedRequest] = useDebouncedState(getAllOrders(), 300, 500);

  return (
    <>
      <AdminNavigationBar/>
      <div className="centered-container">
        <OutlinedInput
          placeholder='Username'
          onChange={handleChange}
          sx={{ mt: 3 }}
        />
        <AdminOrderPaginationTable request={debouncedRequest} sx={{ mt: 3 }}/>
      </div>
      <AppFooter/>
    </>
  );

  function handleChange(event) {
    event.preventDefault();
    const username = event.target.value;
    const request = isBlank(username) ? getAllOrders() : getAllOrdersForUser(username);
    setDebouncedRequest(request);
  }
}
