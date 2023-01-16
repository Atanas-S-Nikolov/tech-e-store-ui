import ProductGrid from '../components/products/ProductGrid';
import { Typography } from "@mui/material";
import NavigationBar from '../components/menu/NavigationBar';
import AppFooter from '../components/footer/AppFooter';
import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const products = useLoaderData().data;
  console.log(products);

  return (
    <>
      <NavigationBar />
      <div className='app-content'>
        <Typography variant="h3" sx={{ mt: 3 }}>Welcome to Tech E-Store</Typography>
        <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>View our newest products</Typography>
        <ProductGrid items={products} />
      </div>
      <AppFooter />
    </>
  );
}