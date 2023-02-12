import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import AppFooter from "../components/footer/AppFooter";
import NavigationBar from "../components/menu/NavigationBar";
import ProductGrid from "../components/products/ProductGrid";

import { convertEnumValueToKey } from "../utils/StringUtils";
import { getNotEarlyAccessProducts, getProducts } from "../api/backend";
import ProductCategory from "../model/product/ProductCategory";
import ProductType from "../model/product/ProductType";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  useEffect(() => {
    const loadProducts = () => isAuthenticated ? getProducts(category, type) : getNotEarlyAccessProducts(category, type);
    loadProducts()
    .then(response => {
      const products = response.data;
      let productCategory, productType;

      if (products && products.length > 0) {
        productCategory = products[0].category;
        productType = products[0].type;
      } else {
        productCategory = convertEnumValueToKey(category);
        productType = convertEnumValueToKey(type);
      }
      
      let pageTitle = "";
      if (category) {
        pageTitle += ProductCategory[productCategory].name;
      } else if (type) {
        pageTitle += ProductType[productType].plural;
      }
      setTitle(pageTitle);
      setProducts(products);
      setLoading(true);
    })
    .catch(error => console.log(error));
  }, [isAuthenticated, category, type]);

  return (
    <>
      <NavigationBar/>
      {
        loading
          ?
            <div style={{
              margin: "1% 1% 0% 1%"
            }}>
              <Typography variant="h5">{title}</Typography>
              <Divider sx={{ mt: 1 }}/>
              <ProductGrid items={products}/>
            </div>
          : null
      }
      <AppFooter/>
    </>
  );
}