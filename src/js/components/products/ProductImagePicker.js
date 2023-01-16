import "../../../styles/products/ProductImagePicker.css";

import IconButton from "@mui/material/IconButton";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ProductImagePicker({ images }) {
  return (
    <div className="image-picker">
      <IconButton><KeyboardArrowLeftIcon /></IconButton>
      {images?.map(({src, alt}) => {
        return <a href={src}><img className="image" src={src} alt={alt} /></a>
      })}
      <IconButton><KeyboardArrowRightIcon /></IconButton>
    </div>
  );
}