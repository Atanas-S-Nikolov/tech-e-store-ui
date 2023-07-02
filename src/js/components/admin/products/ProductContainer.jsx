import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"

import PageSelectTabs from "@/js/components/utils/PageSelectTabs";
import { getProducts } from "@/js/api/service/ProductService";
import Product from "./Product";

export default function ProductContainer() {
  const SIZE_INITAL_VALUE = 4;
  const [paging, setPaging] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(SIZE_INITAL_VALUE);
  const { totalItems, totalPages, items } = paging;

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  }

  const handleSizeChange = (value) => {
    setSize(value);
  }
    
  useEffect(() => {
    const pageToUpdate = page - 1;
    getProducts(pageToUpdate, size)
    .then(response => {
      setPaging(response.data);
      setLoading(true);
    })
    .catch(error => console.log(error));
  }, [page, size]);

  return (
    <>
      {
        loading
          ? <>
              <div className="centered-column-container">
                <Typography variant="h6" color="text.secondary">
                  Found: <span style={{ color: "green" }}>{totalItems}</span>
                </Typography>
                <PageSelectTabs tabValue={SIZE_INITAL_VALUE} onChangeCallback={handleSizeChange}/>
              </div>
              <div className="centered-row-container">
                {items.map(item => <Product key={crypto.randomUUID()} product={item}/>)}
                <Pagination page={page} count={totalPages} onChange={handlePageChange} color="primary"/>
              </div>
            </>
          : null
      }
    </>
  );
}