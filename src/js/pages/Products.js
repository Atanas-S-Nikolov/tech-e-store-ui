import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from "@mui/material/Divider";

import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import AppFooter from "../components/footer/AppFooter";
import NavigationBar from "../components/menu/NavigationBar";
import ProductGrid from "../components/products/ProductGrid";
import StyledLink from "../components/styled/StyledLink";

import { getNotEarlyAccessProducts, getProducts } from "../api/backend";
import ProductType from "../model/product/ProductType"
import { HOME_URL } from "../constants/UrlConstants";
import { categoriesItems } from "../utils/categories";
import { convertEnumValueToKey } from "../utils/StringUtils";
import { buildProductsNavigationUrlByCategory, buildProductsNavigationUrlByCategoryAndType } from "../utils/NavigationUtils";

function getIconByCategory(category) {
  let icon;
  categoriesItems.forEach(c => {
    if (c.text === category) {
      icon = c.icon;
    }
  })
  return icon;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [breadcrumbTypeText, setBreadcrumbTypeText] = useState("");
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  useEffect(() => {
    const loadProducts = () => isAuthenticated ? getProducts(category, type) : getNotEarlyAccessProducts(category, type);
    loadProducts()
    .then(response => {
      const products = response.data;
      let productType;

      if (products && products.length > 0) {
        productType = products[0].type;
      } else {
        productType = convertEnumValueToKey(type);
      }
      
      if (type) {
        setBreadcrumbTypeText(ProductType[productType].plural);
      } else {
        setBreadcrumbTypeText("");
      }

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
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <StyledLink
                  className="link"
                  to={HOME_URL}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </StyledLink>
                <StyledLink
                  className="link"
                  to={buildProductsNavigationUrlByCategory(category)}
                >
                  <Icon sx={{ mr: 0.5 }} fontSize="inherit">{getIconByCategory(category)}</Icon>
                  {category}
                </StyledLink>
                {
                  type
                    ? <StyledLink
                        className="link"
                        to={buildProductsNavigationUrlByCategoryAndType(category, type)}
                      >
                        {breadcrumbTypeText}
                      </StyledLink>
                    : null
                }
              </Breadcrumbs>
              <Divider sx={{ mt: 1 }}/>
              <ProductGrid items={products}/>
            </div>
          : null
      }
      <AppFooter/>
    </>
  );
}