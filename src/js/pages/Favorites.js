import "../../styles/pages/Favorites.css";

import { Typography } from "@mui/material";
import AppFooter from "../components/footer/AppFooter";
import StyledHeader from "../components/styled/StyledHeader";
import { useEffect, useState } from "react";
import { getFavorites } from "../api/service/FavoritesService";
import UsernameDto from "../model/auth/UsernameDto";

import { useSelector } from "react-redux";
import ProductGrid from "../components/products/ProductGrid";

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
        {loading ? <ProductGrid items={products} sx={{ mt: 3 }}/> : null}
      </div>
      <AppFooter/>
    </>
  );
}