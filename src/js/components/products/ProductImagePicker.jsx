import "@/styles/products/ProductImagePicker.css";

import IconButton from "@mui/material/IconButton";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ProductImagePicker({ images }) {
  return (
    <div className="image-picker">
      <IconButton><KeyboardArrowLeftIcon /></IconButton>
      {images?.map(image => {
        const imageUrl = image.url;
        return <a href={imageUrl} key={crypto.randomUUID()}><img className="image" src={imageUrl} alt={imageUrl} /></a>
      })}
      <IconButton><KeyboardArrowRightIcon /></IconButton>
    </div>
  );
}