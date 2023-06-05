import { useState, useEffect } from "react";

export function usePaging(pagingRequest) {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
  }, [pagingRequest]);

  return { totalItems, totalPages, items };
}