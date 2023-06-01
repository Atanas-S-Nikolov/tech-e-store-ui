import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { usePaging } from "@/js/hooks/usePaging";
import OrderRow from './OrderRow';

export default function CollapsiblePaginationTable({ columns, request }) {
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
    <Paper sx={{ width: '60%', mt: 10 ,overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  colSpan={index > 0 ? 1: 2}
                  align='right'
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {items.map(item => <OrderRow columns={columns} row={item}/>)}
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