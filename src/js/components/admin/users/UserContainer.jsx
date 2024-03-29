import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"

import PageSelectTabs from "@/js/components/utils/PageSelectTabs";
import { getAllUsers } from "@/js/api/service/UserService";
import UserPreview from "./UserPreview";

export default function UserContainer() {
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
    getAllUsers(pageToUpdate, size)
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
                {items.map(item => <UserPreview key={crypto.randomUUID()} user={item}/>)}
                <Pagination page={page} count={totalPages} onChange={handlePageChange} color="primary"/>
              </div>
            </>
          : null
      }
    </>
  );
}