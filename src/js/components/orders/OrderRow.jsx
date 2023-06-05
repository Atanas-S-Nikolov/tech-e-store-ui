import { useState, useLayoutEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import OrderProductsCollapsibleRow from '@/js/components/orders/OrderProductsCollapsibleRow';
import StyledRightAlignedTableCell from '@/js/components/styled/StyledRightAlignedTableCell';
import { orderStatus } from '@/js/constants/OrderConstants';
import { cancelOrder, getOrder } from '@/js/api/service/OrderService';
import OrderDto from '@/js/model/order/OrderDto';

export default function OrderRow({ order }) {
  const [orderResponse, setOrderResponse] = useState(order);
  const { id, date, totalPrice, status, username, products } = orderResponse;
  const [open, setOpen] = useState(false);
  const [isActionButtonDisabled, setIsActionButtonDisabled] = useState(false);

  useLayoutEffect(() => {
    if (status && status.toLocaleLowerCase() !== orderStatus.CREATED) {
      setIsActionButtonDisabled(true);
    } 
  }, [orderResponse]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpen}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledRightAlignedTableCell>{id}</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>{date}</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>{totalPrice.toFixed(2)} lv</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>{status}</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>
          <Button onClick={handleCancelOrder} disabled={isActionButtonDisabled}>Cancel</Button>
        </StyledRightAlignedTableCell>
      </TableRow>
      <OrderProductsCollapsibleRow open={open} products={products} colSpan={5}/>
    </>
  );

  function handleOpen() {
    setOpen(prevState => !prevState);
  }

  function handleUpdateOrder() {
    getOrder(new OrderDto(username, id))
      .then(response => setOrderResponse(response.data))
      .catch(error => console.log(error));
  }

  function handleCancelOrder() {
    cancelOrder(new OrderDto(username, id))
      .then(response => handleUpdateOrder())
      .catch(error => console.log(error));
  }
}
