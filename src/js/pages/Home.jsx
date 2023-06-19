import NavigationBar from '@/js/components/header/NavigationBar';
import PaginationProductContainer from '@/js/components/products/PaginationProductContainer';
import AppFooter from '@/js/components/footer/AppFooter';

import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className='centered-container'>
        <Typography variant="h3" sx={{ mt: 3 }}>Welcome to Tech E-Store</Typography>
        <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>Check out our latest products</Typography>
      </div>
      <PaginationProductContainer columnsCount={4}/> 
      <AppFooter />
    </>
  );
}
