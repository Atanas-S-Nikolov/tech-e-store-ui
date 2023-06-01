import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


export default function CartBackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      startIcon={<KeyboardArrowLeftIcon/>}
      size="large"
      onClick={() => navigate(-1)}
      sx={{ width: "48%" }}
    >
      Back
    </Button>
  );
}