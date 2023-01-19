import ProductHeader from "../components/products/ProductHeader";

import NavigationBar from "../components/menu/NavigationBar";
import AppFooter from "../components/footer/AppFooter";
import ProductDetails from "../components/products/ProductDetails";
import ProductImagePicker from "../components/products/ProductImagePicker";
import { useLoaderData } from "react-router-dom";

export default function ProductPage() {
  const product = useLoaderData().data;
  return (
    <>
      <NavigationBar />
      <ProductHeader product={product} />
      <ProductImagePicker images={product.imageUrls}/>
      <ProductDetails product={product} />
      <AppFooter />
    </>
  ); 
}