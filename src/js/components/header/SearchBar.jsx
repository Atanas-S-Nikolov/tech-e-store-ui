import { useState, useEffect, useRef } from "react";
import { useDebouncedState, useClickOutside } from "@react-hookz/web";

import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { searchProducts, searchProductsWithoutEarlyAccess } from "@/js/api/service/ProductService";
import { isNotBlank } from "@/js/utils/StringUtils";
import { buildProductUrl } from "@/js/api/builder/URLBuilder";
import { buildProductsSearchQueryUrl } from "@/js/utils/NavigationUtils";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const StyledSearchResult = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  border: '2px solid',
  borderColor: grey[100],
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '99%',
  },
}));

const StyledProduct = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 10,
  marginBottom: '10px',
}));

export default function SearchBar() {
  const { isAuthenticated } = useSelector(state => state.authentication);
  const [products, setProducts] = useState([]);
  const [searchWord, setSearchWord] = useDebouncedState("", 300, 600);
  const [isOpen, setIsOpen] = useState(false);
  const searchResultRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchWord) {
      const productsPromise = isAuthenticated ? searchProducts(searchWord) : searchProductsWithoutEarlyAccess(searchWord);
      productsPromise
        .then(response => {
          const data = response.data;
          setProducts(data);
          if (data.length > 0) {
            setIsOpen(true);
          }
        })
        .catch(error => console.log(error));
    }
  }, [searchWord]);

  useClickOutside(searchResultRef, closeSearchResult);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{
            'aria-label': 'search',
          }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {isOpen
        ? 
        <StyledSearchResult ref={searchResultRef}>
          {
            products.map(product => (
              <StyledProduct key={crypto.randomUUID()}>
                <img src={product.imageUrls[0]} width='15%'/>
                <p
                  className='link-default-color'
                  onClick={() => navigateToProduct(product.name)}
                  style={{ width: '81%' }}
                >
                  {product.name}
                </p>
              </StyledProduct>
            ))
          }
        </StyledSearchResult>
        : null
      }
      </Search>
    </>
  );

  function handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    if (value && isNotBlank(value)) {
      setSearchWord(value);
      return;
    }
    closeSearchResult();
    setSearchWord("");
  }

  function handleKeyDown(event) {
    if (event.key.toLowerCase() === 'enter' && isNotBlank(searchWord)) {
      navigate(buildProductsSearchQueryUrl(searchWord));
    }
  }

  function navigateToProduct(name) {
    navigate(buildProductUrl(name));
  }

  function closeSearchResult() {
    setIsOpen(false);
  }
}