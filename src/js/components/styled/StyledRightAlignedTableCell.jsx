import { styled } from "@mui/system";

import TableCell from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  minWidth: 170
}));

export default function StyledRightAlignedTableCell(props) {
  return (
    <StyledTableCell align='right' {...props}>{props.children}</StyledTableCell>
  );
}