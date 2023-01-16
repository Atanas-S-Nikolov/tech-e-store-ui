import "../../../styles/products/ProductPreview.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { buildProductUrl } from "../../api/builder/URLBuilder";

export default function ProductPreview({ product }) {
  const { name, price, imageUrls } = product;
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
          sx={{ height: 140 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: <b style={{ color: "green" }}>{price} lv</b>
          </Typography>
        </CardContent>
      </div>
      <Button size='large' startIcon={<ShoppingCartIcon/>} sx={{ width: "100%" }}>Buy</Button>
      <Button size="small" startIcon={<CompareArrowsIcon/>} sx={{ float: "left", width: "50%" }}>Compare</Button>
      <Button size="small" startIcon={<FavoriteBorderIcon/>} sx={{ float: "right", width: "50%" }}>Favorite</Button>
    </Card>
  );
}