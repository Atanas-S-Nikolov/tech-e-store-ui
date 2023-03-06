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

import ProductType from "../model/product/ProductType"
import { HOME_URL } from "../constants/UrlConstants";
import { categoriesItems } from "../utils/categories";
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
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const breadcrumbTypeText = type ? ProductType.getPluralByName(type) : "";

  return (
    <>
      <NavigationBar/>
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
        <ProductGrid category={category} type={type}/>
      </div>
      <AppFooter/>
    </>
  );
}