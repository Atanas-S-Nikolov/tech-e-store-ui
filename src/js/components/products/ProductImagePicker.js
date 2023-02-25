import "../../../styles/products/ProductImagePicker.css";

import IconButton from "@mui/material/IconButton";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ProductImagePicker({ images }) {
  return (
    <div className="image-picker">
      <IconButton><KeyboardArrowLeftIcon /></IconButton>
      {images?.map(imageSrc => {
        return <a href={imageSrc} key={crypto.randomUUID()}><img className="image" src={imageSrc} alt={imageSrc} /></a>
      })}
      <IconButton><KeyboardArrowRightIcon /></IconButton>
    </div>
  );
}