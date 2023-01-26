import "../../../styles/products/ProductHeader.css";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Chip from "@mui/material/Chip";
import { addProductReducer } from "../../redux/productCompareSlice";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from "@mui/system";
import CustomPriceTypography from "./CustomPriceTypography";

import { useDispatch } from "react-redux";

export default function ProductHeader({ product }) {
  const { name, price, stocks, earlyAccess, imageUrls } = product;
  const productDisplayImage = imageUrls ? imageUrls[0] : "";

  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none"
  }));

  const dispatch = useDispatch();

  const handleCompare = (event) => {
    event.preventDefault();
    dispatch(addProductReducer(product));
  }

  const renderStocksLabel = () => {
    return stocks > 0
      ? <Typography variant="h6" color="success.main">In stock</Typography>
      : <Typography variant="h6" color="warning.main">Out of stock</Typography>
  }

  return (
    <div className='product-header-section'>
      <img className='main-image' src={productDisplayImage} alt={name}/>
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
            {
              earlyAccess 
                ? <TableRow>
                    <Chip label="Early Access" variant="outlined" sx={{ color: "primary.main", borderColor: "primary.main" }}/>
                  </TableRow>
                : null
            }
            <TableRow>
              <BorderlessTableCell>
                <Typography variant="h6">
                  Price: <CustomPriceTypography price={price}/>
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
              <Button onClick={handleCompare} startIcon={<CompareArrowsIcon/>}>Compare</Button>
              <Button startIcon={<FavoriteBorderIcon/>}>Favorite</Button>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}