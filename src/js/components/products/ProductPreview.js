import "../../../styles/products/ProductPreview.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductPreview({ product }) {
  const { name, price, image } = product;
  return (
    <Card className='product-preview' sx={{ maxWidth: 275 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: <b style={{ color: "green" }}>{price}</b> lv
        </Typography>
      </CardContent>
      <Button size='large' startIcon={<ShoppingCartIcon/>} sx={{ width: "100%" }}>Buy</Button>
      <Button size="small" startIcon={<CompareArrowsIcon/>} sx={{ float: "left", width: "50%" }}>Compare</Button>
      <Button size="small" startIcon={<FavoriteBorderIcon/>} sx={{ float: "right", width: "50%" }}>Favorite</Button>
    </Card>
  );
}