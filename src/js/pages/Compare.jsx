import "@/styles/pages/Compare.css";

import AppFooter from "@/js/components/footer/AppFooter";
import StyledHeader from "@/js/components/styled/StyledHeader";
import StyledCloseIconButton from "@/js/components/styled/StyledCloseIconButton";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Link } from "react-router-dom";

import { HOME_URL } from "@/js/constants/UrlConstants";
import { buildProductUrl } from "@/js/api/builder/URLBuilder";

import { useSelector, useDispatch } from "react-redux";
import { removeProductReducer, resetCompareStateReducer } from "@/js/redux/productCompareSlice";

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
  const areProductsEmpty = products.length === 0;

  const dispatch = useDispatch()

  const handleRemoveProduct = (event, index) => {
    event.preventDefault();
    dispatch(removeProductReducer(index));
  }

  const handleResetState = (event) => {
    event.preventDefault();
    dispatch(resetCompareStateReducer());
  }

  const labelsArr = [
    { value: "Price" },
    { value: "Brand" },
    { value: "Model" },
    { value: "Category" },
    { value: "Type" },
  ];

  const renderComparedProducts = () => {
    return (
      <>
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
          {products.map((product, index) => {
            const { name, price, brand, model, category, type, imageUrls } = product;
            const productDisplayImage = imageUrls ? imageUrls[0] : "";
            const compareArr = [
              { value: `${price} lv` },
              { value: brand },
              { value: model },
              { value: category },
              { value: type },
            ];
            return (
              <div key={crypto.randomUUID()} align="center" style={{ width: "300px" }}>
                <StyledCloseIconButton onClick={(event) => handleRemoveProduct(event, index)}/>
                <img src={productDisplayImage} alt={name}/>
                <Typography>
                  <Link className="link-default-color" to={`../${buildProductUrl(name)}`}>
                    {name}
                  </Link>
                </Typography>
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
        <Button variant="contained" onClick={handleResetState} sx={{ mt: 4 }}>Remove all</Button>
      </>
    );
  }

  return (
    <>
      <StyledHeader />
        <div className="products-compare">
          <Typography variant="h3">Compare products</Typography>
          {areProductsEmpty ? <Link className="link" to={HOME_URL}>Add products to be compared</Link> : renderComparedProducts()}
        </div>
      <AppFooter />
    </>
  );
}