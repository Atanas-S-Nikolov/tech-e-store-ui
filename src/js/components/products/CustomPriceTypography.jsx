import Typography from '@mui/material/Typography';

export default function CustomPriceTypography({ price }) {
  return (
    <Typography variant="h6">
      <b style={{ color: "green" }}>{price} lv</b>
    </Typography>
  );
}