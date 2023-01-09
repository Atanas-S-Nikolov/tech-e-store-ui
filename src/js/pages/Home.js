import ProductGrid from '../components/products/ProductGrid';
import logo from "../../logo.svg"
import { Typography } from "@mui/material";
import NavigationBar from '../components/menu/NavigationBar';
import AppFooter from '../components/footer/AppFooter';

export default function Home() {
  const products = [
    {
      name: "Xiaomi Poco X3",
      price: "469.99",
      image: logo
    },
    {
      name: "Logitech G Pro X",
      price: "199.99",
      image: logo
    },
    {
      name: "Huawei Freebuds 4i",
      price: "99.99",
      image: logo
    },
    {
      name: "Hama Fit Watch 5910",
      price: "95.00",
      image: logo
    },
    {
      name: "Logitech M190",
      price: "30.00",
      image: logo
    },
    {
      name: "Xiaomi Poco X3",
      price: "469.99",
      image: logo
    },
    {
      name: "Logitech G Pro X",
      price: "199.99",
      image: logo
    },
    {
      name: "Huawei Freebuds 4i",
      price: "99.99",
      image: logo
    },
    {
      name: "Hama Fit Watch 5910",
      price: "95.00",
      image: logo
    },
    {
      name: "Logitech M190",
      price: "30.00",
      image: logo
    }
  ];

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