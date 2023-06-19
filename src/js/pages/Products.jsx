import { useSearchParams } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import AppFooter from "@/js/components/footer/AppFooter";
import NavigationBar from "@/js/components/header/NavigationBar";
import PaginationProductContainer from "@/js/components/products/PaginationProductContainer";
import StyledLink from "@/js/components/styled/StyledLink";

import ProductType from "@/js/model/product/ProductType"
import { HOME_URL } from "@/js/constants/UrlConstants";
import { categoriesItems } from "@/js/utils/categories";
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
  const keyword = searchParams.get("keyword");
  const breadcrumbTypeText = type ? ProductType.getPluralByName(type) : "";

  return (
    <>
      <NavigationBar/>
      <div style={{
        margin: "1% 1% 0% 1%"
      }}>
        {
          keyword
            ? null
            : (
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <StyledLink
                  className="link"
                  to={HOME_URL}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </StyledLink>
                {
                  category
                    ? <StyledLink
                        className="link"
                        to={buildProductsNavigationUrlByCategory(category)}
                      >
                        <Icon sx={{ mr: 0.5 }} fontSize="inherit">{getIconByCategory(category)}</Icon>
                        {category}
                      </StyledLink>
                    : <Typography color='green'>All</Typography>
                }
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
            )
        }
        
        <Divider sx={{ mt: 1 }}/>
        <PaginationProductContainer category={category} type={type} keyword={keyword} columnsCount={5}/>
      </div>
      <AppFooter/>
    </>
  );
}