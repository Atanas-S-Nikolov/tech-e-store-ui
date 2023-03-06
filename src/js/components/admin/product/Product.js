import "../../../../styles/admin/product/Product.css";

import { Link } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { buildProductUrl } from "../../../api/builder/URLBuilder";

const actionButtons = [
  { text: "Edit", icon: <EditIcon/> },
  { text: "Delete", icon: <DeleteIcon/> }
];

export default function Product({ product }) {
  const { name, imageUrls } = product;
  const productDisplayImage = imageUrls ? imageUrls[0] : "";

  return (
    <div className="admin-product centered-column-container">
      <img src={productDisplayImage} alt={name}/>
      <Typography  variant="h5">
        <Link className="link-default-color" to={`../${buildProductUrl(name)}`}>
          {name}
        </Link>
      </Typography>
        {actionButtons.map(button => <Button variant="text" startIcon={button.icon}>{button.text}</Button>)}
    </div>
  );
}