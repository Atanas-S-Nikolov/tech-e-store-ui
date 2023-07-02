import { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import ProductPreview from "./ProductPreview";
import StyledGridContainer from "@/js/components/styled/StyledGridContainer";
import PageSelectTabs from "@/js/components/utils/PageSelectTabs";

import {
  getProducts,
  getNotEarlyAccessProducts,
  searchQueryProducts,
  searchQueryProductsWithoutEarlyAccess
} from "@/js/api/service/ProductService";

export default function PaginationProductContainer({ category, type, keyword, columnsCount, pageSize }) {
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [paging, setPaging] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const { totalItems, totalPages, items } = paging;
  const areProductsFiltered = category || type;
  const isPageEmpty = totalItems === 0;

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
      if (keyword) {
        return searchQueryProducts(pageToUpdate, size, keyword);
      }

      return areProductsFiltered 
        ? getProducts(pageToUpdate, size, category, type) 
        : getProducts(pageToUpdate, size);
    }

    if (keyword) {
      return searchQueryProductsWithoutEarlyAccess(pageToUpdate, size, keyword);
    }

    return areProductsFiltered 
      ? getNotEarlyAccessProducts(pageToUpdate, size, category, type) 
      : getNotEarlyAccessProducts(pageToUpdate, size);
  }, [isAuthenticated, page, size, areProductsFiltered, category, type, keyword])
    
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
                <PageSelectTabs tabValue={columnsCount} onChangeCallback={handleSizeChange}/>
              </div>
              {renderGridContainer()}
            </>
          : null
      }
    </>
  )

  function renderGridContainer() {
    const paginationGrid = (
      <div className="centered-container">
        <StyledGridContainer gridTemplateColumns={`repeat(${columnsCount}, 1fr)`} gap={10}>
          {items.map(item => <ProductPreview product={item} key={crypto.randomUUID()}/>)}
        </StyledGridContainer>
        <Pagination page={page} count={totalPages} onChange={handlePageChange} color="primary"/>
      </div>
    );
    return (
      <div className="centered-container">
        {isPageEmpty
          ? <Typography variant="h5" color="text.secondary">The page is empty</Typography>
          : paginationGrid
        }
      </div>
    );
  }
}