import { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import ProductPreview from "./ProductPreview";
import StyledGridContainer from "../styled/StyledGridContainer";
import { getProducts, getNotEarlyAccessProducts } from "../../api/service/ProductService";
import PageSelectTabs from "../utils/PageSelectTabs";

export default function PaginationProductContainer({ category, type, columnsCount }) {
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [paging, setPaging] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const { totalItems, totalPages, items } = paging;
  const areProductsFiltered = category || type;

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  }

  const handleSizeChange = (value) => {
    setSize(value);
  }

  const loadProducts = useCallback(() => {
    const pageToUpdate = page - 1;
    if (isAuthenticated) {
      return areProductsFiltered 
        ? getProducts(pageToUpdate, size, category, type) 
        : getProducts(pageToUpdate, size);
    }
    return areProductsFiltered 
      ? getNotEarlyAccessProducts(pageToUpdate, size, category, type) 
      : getNotEarlyAccessProducts(pageToUpdate, size);
  }, [isAuthenticated, page, size, areProductsFiltered, category, type])
    
  useEffect(() => {
    loadProducts()
    .then(response => {
      setPaging(response.data);
      setLoading(true);
    })
    .catch(error => console.log(error));
  }, [loadProducts]);

  return (
    <>
      {
        loading
          ? <>
              <div className="centered-column-container">
                <Typography variant="h6" color="text.secondary">
                  Found: <span style={{ color: "green" }}>{totalItems}</span>
                </Typography>
                <PageSelectTabs onChangeCallback={handleSizeChange}/>
              </div>
              <div className="centered-container">
                <StyledGridContainer gridTemplateColumns={`repeat(${columnsCount}, 1fr)`} gap={10}>
                  {items.map(item => <ProductPreview product={item} key={crypto.randomUUID()}/>)}
                </StyledGridContainer>
                <Pagination page={page} count={totalPages} onChange={handlePageChange} color="primary"/>
              </div>
            </>
          : null
      }
    </>
  )
}