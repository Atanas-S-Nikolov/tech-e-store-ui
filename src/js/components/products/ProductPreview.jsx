import "@/styles/products/ProductPreview.css";

import CompareButton from "@/js/components/utils/CompareButton";
import FavoriteButton from "@/js/components/utils/FavoriteButton";
import BuyButton from "@/js/components/utils/BuyButton";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { useNavigate } from "react-router-dom";
import { buildProductUrl } from "@/js/api/builder/URLBuilder";

export default function ProductPreview({ product }) {
  const { name, price, earlyAccess, images } = product;
  const mainImageUrl = images.find(image => image.main).url;
  
  const navigate = useNavigate();

  const handleOnClick = (event) => {
    event.preventDefault();
    navigate(buildProductUrl(name));
  }

  return (
    <Card className='product-preview' sx={{ maxWidth: 275 }}>
      <div onClick={handleOnClick}>
        <CardMedia
          component="img"
          src={mainImageUrl}
          alt={name}
          title={name}
          sx={{ height: 280 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: <b style={{ color: "green" }}>{parseFloat(price).toFixed(2)} lv</b>
          </Typography>
          {
            earlyAccess 
              ? <Chip label="Early Access" variant="outlined" sx={{ color: "primary.main", borderColor: "primary.main" }}/>
              : null
          }
        </CardContent>
      </div>
      <BuyButton fullWidth product={product}/>
      <CompareButton product={product} size="small" sx={{ float: "left", width: "50%" }}/>
      <FavoriteButton productName={name} size="small" sx={{ float: "right", width: "50%" }}/>
    </Card>
  );
}
