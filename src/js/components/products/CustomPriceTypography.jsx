import Typography from '@mui/material/Typography';

export default function CustomPriceTypography({ price, variant = 'h6' }) {
  const formatedPrice = parseFloat(price).toFixed(2);
  const zero = 0;
  return (
    <Typography variant={variant}>
      <b style={{ color: "green" }}>{isNaN(formatedPrice) ? zero.toFixed(2) : formatedPrice} lv</b>
    </Typography>
  );
}