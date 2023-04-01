import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function PageSelectTabs(props) {
  const { onChangeCallback } = props;
  const {onChangeCallback: _, ...propsForBox} = props; 
  const tabValue = 4;
  const [value, setValue] = useState(tabValue);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    onChangeCallback(newValue);
  };

  return (
    <Box {...propsForBox}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value={tabValue} label={tabValue} />
        <Tab value={tabValue * 2} label={tabValue * 2} />
        <Tab value={tabValue * 3} label={tabValue * 3} />
      </Tabs>
    </Box>
  );
}
