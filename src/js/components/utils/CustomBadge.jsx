import Badge from '@mui/material/Badge';

export default function CustomBadge(props) {
  return (
    <Badge color="success" showZero {...props}>
      {props.children}
    </Badge>
  );
}