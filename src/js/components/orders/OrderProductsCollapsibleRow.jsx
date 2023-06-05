import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

export default function OrderProductsCollapsibleRow({ open, products, colSpan }) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Products
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align='right'>Price for one</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => {
                  const { productName, quantity, price} = product;
                  const priceForOne = price.toFixed(2);
                  const totalPrice = (priceForOne * quantity).toFixed(2);
                  return (
                    <TableRow key={crypto.randomUUID()}>
                      <TableCell>{productName}</TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                      <TableCell align="right">{`${priceForOne} lv`}</TableCell>
                      <TableCell align="right">{`${totalPrice} lv`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}