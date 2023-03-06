import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

export default function StyledCardText(props) {
  const CardText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: 25
  }));

  return (
    <CardText variant="h5">{props.children}</CardText>
  );
}