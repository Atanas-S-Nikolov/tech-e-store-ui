import "../../../styles/products/ProductHeader.css";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from "@mui/system";

export default function ProductHeader({ product }) {
    const { name, price, stocks, image } = product;

    const BorderlessTableCell = styled(TableCell)(() => ({
      borderBottom: "none"
    }));

    const renderStocksLabel = () => {
      return stocks > 0
        ? <Typography variant="h6" color="success.main">In stock</Typography>
        : <Typography variant="h6" color="warning.main">Out of stock</Typography>
    }

    return (
      <div className='product-header-section'>
        <img className='main-image' src={image} alt='product'/>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <BorderlessTableCell>
                  <Typography gutterBottom variant="h4" component="div">
                    {name}
                  </Typography>
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>{renderStocksLabel()}</BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <Typography variant="h6">
                    Price: <b style={{ color: "green" }}>{price} lv</b>
                  </Typography>
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <Button
                    fullWidth
                    size='large'
                    variant="contained"
                    startIcon={<ShoppingCartIcon/>}
                  >
                    Buy
                  </Button>
                </BorderlessTableCell>
              </TableRow>
              <TableRow className="actions">
                <Button startIcon={<CompareArrowsIcon/>}>Compare</Button>
                <Button startIcon={<FavoriteBorderIcon/>}>Favorite</Button>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}