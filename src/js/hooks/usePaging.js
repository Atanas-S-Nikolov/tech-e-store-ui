import { useState, useEffect } from "react";

export function usePaging(pagingRequest) {
  const [totalItems, setTotalItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    pagingRequest.then(response => {
      const paging = response.data;
      setTotalItems(paging.totalItems);
      setTotalPages(paging.totalPages);
      setItems(paging.items);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return { totalItems, totalPages, items };
}