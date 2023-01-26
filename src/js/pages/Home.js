import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import NavigationBar from '../components/menu/NavigationBar';
import ProductGrid from '../components/products/ProductGrid';
import AppFooter from '../components/footer/AppFooter';
import { getAllProducts, getAllNotEarlyAccessProducts } from "../api/backend";

import { Typography } from "@mui/material";
import { sortProductsByEarlyAccess } from "../utils/ProductUtils";

export default function Home() {
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = () => {
      return isAuthenticated ? getAllProducts() : getAllNotEarlyAccessProducts();
    }

    loadProducts()
    .then(response => {
      setProducts(response.data);
      setLoading(true);
    })
    .catch(error => console.log(error));
    
  }, [isAuthenticated]);

  const productsToRender = isAuthenticated ? sortProductsByEarlyAccess(products) : products;
  
  return (
    <>
      <NavigationBar />
      <div className='app-content'>
        <Typography variant="h3" sx={{ mt: 3 }}>Welcome to Tech E-Store</Typography>
        <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>View our newest products</Typography>
        {loading ? <ProductGrid items={productsToRender} /> : null}
      </div>
      <AppFooter />
    </>
  );
}