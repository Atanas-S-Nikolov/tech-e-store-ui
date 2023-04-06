import ProductHeader from "@/js/components/products/ProductHeader";

import NavigationBar from "@/js/components/menu/NavigationBar";
import AppFooter from "@/js/components/footer/AppFooter";
import ProductDetails from "@/js/components/products/ProductDetails";
import ProductImagePicker from "@/js/components/products/ProductImagePicker";
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