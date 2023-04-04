import "../../styles/pages/NotFound.css";

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { IconButton, Typography } from '@mui/material';
import { HOME_URL } from "../constants/UrlConstants";

export default function NotFound() {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const handleIconOnMouseEnter = (event) => {
    event.preventDefault();
    setIsHover(true);
  }

  const handleIconOnMouseLeave = (event) => {
    event.preventDefault();
    setIsHover(false);
  }

  return (
    <div className='not-found-404'>
      <IconButton
        onClick={() => navigate(HOME_URL)}
        onMouseEnter={handleIconOnMouseEnter}
        onMouseLeave={handleIconOnMouseLeave}
        disableRipple
        size="large"
      >
        {isHover ? <SentimentSatisfiedAltIcon /> : <SentimentVeryDissatisfiedIcon />}
      </IconButton>
      <Typography variant='h1'>Ooops!</Typography>
      <Typography variant='h2'>404: Page not found</Typography>
    </div>
  );
}