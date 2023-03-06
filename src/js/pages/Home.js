import NavigationBar from '../components/menu/NavigationBar';
import ProductGrid from '../components/products/ProductGrid';
import AppFooter from '../components/footer/AppFooter';

import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className='centered-container'>
        <Typography variant="h3" sx={{ mt: 3 }}>Welcome to Tech E-Store</Typography>
        <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>Check out our latest products</Typography>
      </div>
      <ProductGrid/> 
      <AppFooter />
    </>
  );
}
