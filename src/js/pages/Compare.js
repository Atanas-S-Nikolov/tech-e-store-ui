import "../../styles/pages/Compare.css";

import AppFooter from "../components/footer/AppFooter";
import StyledHeader from "../components/styled/StyledHeader";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { useSelector, useDispatch } from "react-redux";
import { resetCompareStateReducer } from "../redux/productCompareSlice";

function createRow({ value }, index, ) {
  const bgColor = index % 2 === 0 ? "#f9f9f9" : "none";
  return (
    <TableRow key={crypto.randomUUID()} sx={{ backgroundColor: bgColor }}>
      <TableCell align='center'><Typography>{value}</Typography></TableCell>
    </TableRow>
  );
}

export default function Compare() {
  const { products } = useSelector(state => state.productCompare);
  const dispatch = useDispatch()

  const handleResetState = () => {
    dispatch(resetCompareStateReducer());
  }

  const labelsArr = [
    { value: "Price" },
    { value: "Brand" },
    { value: "Model" },
    { value: "Category" },
    { value: "Type" },
  ];

  return (
    <>
      <StyledHeader />
        <div className="products-compare">
          <Typography variant="h3">Compare products</Typography>
          <div className="compare-details">
            <TableContainer component={Paper} sx={{ mt: 28.5, minWidth: "fit-content", position: "relative" }}>
              <Table>
                <TableBody>
                  {labelsArr.map((d, index) => {
                    return createRow(d, index);
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {products.map(product => {
              const { name, price, brand, model, category, type, imageUrls } = product;
              const productDisplayImage = imageUrls ? imageUrls[0] : "";
              const compareArr = [
                { value: price },
                { value: brand },
                { value: model },
                { value: category },
                { value: type },
              ];
              return (
                <div align="center" style={{ width: "300px" }}>
                  <img src={productDisplayImage} alt={name}/>
                  <Typography>{name}</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {compareArr.map((d, index) => {
                          return createRow(d, index);
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              );
            })}
          </div>
          <Button variant="contained" onClick={handleResetState}>RESET STATE</Button>
        </div>
      <AppFooter />
    </>
  );
}