import "../../../styles/products/ProductPreview.css";

import CompareButton from "../utils/CompareButton";
import FavoriteButton from "../utils/FavoriteButton";
import BuyButton from "../utils/BuyButton";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { useNavigate } from "react-router-dom";
import { buildProductUrl } from "../../api/builder/URLBuilder";

export default function ProductPreview({ product }) {
  const { name, price, earlyAccess, imageUrls } = product;
  const imageUrl = imageUrls[0];
  
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
          src={imageUrl}
          alt={name}
          title={name}
          sx={{ height: 180 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: <b style={{ color: "green" }}>{price} lv</b>
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