import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function CartNextButton({ disabled = false, text = "Next", onClick }) {
  return (
    <Button
      variant="contained"
      startIcon={<KeyboardArrowRightIcon/>}
      size="large"
      disabled={disabled}
      onClick={onClick}
      sx={{ width: "48%" }}
    >
      {text}
    </Button>
  );
}