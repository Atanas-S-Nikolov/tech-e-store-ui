import ProductHeader from "@/js/components/products/ProductHeader";

import NavigationBar from "@/js/components/header/NavigationBar";
import AppFooter from "@/js/components/footer/AppFooter";
import ProductDetails from "@/js/components/products/ProductDetails";
import { useLoaderData } from "react-router-dom";

export default function ProductPage() {
  const product = useLoaderData().data;
  return (
    <>
      <NavigationBar />
      <ProductHeader product={product} />
      <ProductDetails product={product} />
      <AppFooter />
    </>
  ); 
}