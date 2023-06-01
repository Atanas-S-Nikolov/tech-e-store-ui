import Typography from "@mui/material/Typography";

export default function CartTitle({ text }) {
  return (<Typography variant="h4" color="text.secondary" sx={{ mt: 10 }}>{text}</Typography>);
}
