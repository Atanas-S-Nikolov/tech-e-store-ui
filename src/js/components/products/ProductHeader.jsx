import "@/styles/products/ProductHeader.css";

import ProductImagePicker from "@/js/components/products/ProductImagePicker";
import CustomPriceTypography from "./CustomPriceTypography";
import FavoriteButton from "@/js/components/utils/FavoriteButton";
import CompareButton from "@/js/components/utils/CompareButton";
import BuyButton from "@/js/components/utils/BuyButton";

import { styled } from "@mui/system";

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Chip from "@mui/material/Chip";

import { useSelector } from "react-redux";
import { formatDate } from "@/js/utils/DateUtils";

export default function ProductHeader({ product }) {
  const { name, price, stocks, earlyAccess, dateOfCreation, dateOfModification } = product;
  const sortedImages = product.images.sort((a, b) => b.main - a.main);
  const { role } = useSelector(state => state.authentication);
  const isAdmin = role === import.meta.env.VITE_ADMIN_ROLE;

  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none"
  }));

  const renderStocksLabel = () => {
    return stocks > 0
      ? <Typography variant="h6" color="success.main">In stock {isAdmin ? `(${stocks})` : null}</Typography>
      : <Typography variant="h6" color="warning.main">Out of stock</Typography>
  }

  return (
    <div className='product-header-section'>
      <ProductImagePicker images={sortedImages}/>
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
                <Typography
                  variant="h6"
                  sx={{ 
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1
                  }}
                >
                  Price: <CustomPriceTypography price={price}/>
                </Typography>
              </BorderlessTableCell>
              <BorderlessTableCell>
                <BuyButton fullWidth variant="contained" product={product}/>
              </BorderlessTableCell>
            </TableRow>
            <TableRow className="actions">
              <CompareButton product={product}/>
              <FavoriteButton productName={name}/>
            </TableRow>
            {
              isAdmin
                ? <TableRow>
                    <BorderlessTableCell>
                      <Typography>Created on: {formatDate(dateOfCreation, "en-uk")}</Typography>
                    </BorderlessTableCell>
                    <BorderlessTableCell>
                      <Typography>Modified on: {formatDate(dateOfModification, "en-uk")}</Typography>
                    </BorderlessTableCell>  
                  </TableRow>
                : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
