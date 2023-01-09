import { styled } from '@mui/system';

import { Link } from 'react-router-dom';

export default function StyledLink(props) {
  const CustomLink = styled(Link)(() => ({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  }));

  return (
    <CustomLink {...props}/>
  );
}