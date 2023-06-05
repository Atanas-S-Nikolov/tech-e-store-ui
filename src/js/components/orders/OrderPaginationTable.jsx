import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { usePaging } from "@/js/hooks/usePaging";
import OrderRow from '@/js/components/orders/OrderRow';
import StyledRightAlignedTableCell from '@/js/components/styled/StyledRightAlignedTableCell';

export default function OrderPaginationTable({ request, sx }) {
  const initialRowsPerPageOption = 5;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPageOption);
  const { totalItems, items } = usePaging(request);
  const rowsPerPageOptions = [initialRowsPerPageOption, initialRowsPerPageOption * 2, initialRowsPerPageOption * 3];

  function handlePageChange(event, value) {
    event.preventDefault();
    setPage(value);
  }

  function handlePagePerRowsChange(event) {
    event.preventDefault()
    setRowsPerPage(event.target.value);
  }

  return (
    <Paper sx={{ minWidth: '60%', overflow: 'hidden', ...sx}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledRightAlignedTableCell colSpan={2}>ID</StyledRightAlignedTableCell>
              <StyledRightAlignedTableCell>Date</StyledRightAlignedTableCell>
              <StyledRightAlignedTableCell>Total price</StyledRightAlignedTableCell>
              <StyledRightAlignedTableCell>Status</StyledRightAlignedTableCell>
              <StyledRightAlignedTableCell>Action</StyledRightAlignedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => <OrderRow key={crypto.randomUUID()} order={item}/>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePagePerRowsChange}
      />
    </Paper>
  );
}