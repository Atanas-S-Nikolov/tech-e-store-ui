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
import { getOrder, deliverOrder, finalizeOrder, returnOrder } from "@/js/api/service/OrderService";
import OrderDto from "@/js/model/order/OrderDto";

export default function AdminOrderRow({ order }) {
  const INITIAL_ACTION_BUTTON_LABEL = 'deliver';
  const [orderResponse, setOrderResponse] = useState(order);
  const { id, date, totalPrice, status, username, products } = orderResponse;
  const [open, setOpen] = useState(false);
  const [actionButton, setActionButton] = useState(<Button>{INITIAL_ACTION_BUTTON_LABEL}</Button>);

  useLayoutEffect(() => {
    let label;
    let onClick;
    let isButtonDisabled = false;

    switch(status.toLocaleLowerCase()) {
      case orderStatus.CREATED:
        label = INITIAL_ACTION_BUTTON_LABEL;
        onClick = handleDeliverOrder;
        break;
      case orderStatus.DELIVERED:
        label = 'receive';
        onClick = handleFinalizeOrder;
        break;
      case orderStatus.RECEIVED:
        label = 'return';
        onClick = handleReturnOrder;
        break;
      case orderStatus.CANCELED:
        label = INITIAL_ACTION_BUTTON_LABEL;
        isButtonDisabled = true;
        break;
      case orderStatus.RETURNED:
        label = 'return';
        isButtonDisabled = true;
        break;
      default:
        console.log('Unrecognized order status');
    }
    setActionButton(<Button disabled={isButtonDisabled} onClick={onClick}>{label}</Button>);
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
        <StyledRightAlignedTableCell>{username}</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>{status}</StyledRightAlignedTableCell>
        <StyledRightAlignedTableCell>{actionButton}</StyledRightAlignedTableCell>
      </TableRow>
      <OrderProductsCollapsibleRow open={open} products={products} colSpan={7}/>
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

  async function handleDeliverOrder() {
    try {
      await deliverOrder(new OrderDto(username, id));
      handleUpdateOrder();
    } catch(error) {
      console.log(error);
    }
  }

  async function handleFinalizeOrder() {
    try {
      await finalizeOrder(new OrderDto(username, id));
      handleUpdateOrder();
    } catch(error) {
      console.log(error);
    }
  }

  async function handleReturnOrder() {
    try {
      await returnOrder(new OrderDto(username, id));
      handleUpdateOrder();
    } catch(error) {
      console.log(error);
    }
  }
}
