import "@/styles/pages/Favorites.css";

import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import AppFooter from "@/js/components/footer/AppFooter";
import StyledHeader from "@/js/components/styled/StyledHeader";
import { getFavorites } from "@/js/api/service/FavoritesService";
import UsernameDto from "@/js/model/auth/UsernameDto";
import ProductPreview from "@/js/components/products/ProductPreview";

import { useSelector } from "react-redux";
import StyledGridContainer from "@/js/components/styled/StyledGridContainer";

export default function Favorites() {
  const { username } = useSelector(state => state.authentication);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areProductsEmpty, setAreProductsEmpty] = useState(true);

  useEffect(() => {
    getFavorites(new UsernameDto(username))
      .then(response => {
        const favoriteProducts = response.data.products;
        setAreProductsEmpty(favoriteProducts.length === 0);
        setProducts(favoriteProducts);
        setLoading(true);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <>
      <StyledHeader/>
      <div className="favorites-content">
        <Typography variant="h3">Favorites</Typography>
        {
          areProductsEmpty
            ? <Typography variant="h5" color="text.secondary" sx={{ mt: 5, }}>You currently do not have any favorite products</Typography>
            : null
        }
        {
          loading 
            ? <StyledGridContainer gridTemplateColumns='repeat(5, 1fr)' gap={10}> 
                {products.map(product => <ProductPreview key={crypto.randomUUID()} product={product}/>)}
              </StyledGridContainer> 
            : null
        }
      </div>
      <AppFooter/>
    </>
  );
}