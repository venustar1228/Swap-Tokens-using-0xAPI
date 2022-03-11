import React from 'react'
import { 
    Box, 
    FormControl 
  } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectHours() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
  return (
    <>
        <Box className="lft_slct_box">
            <FormControl sx={{ minWidth: 80 }}>
                <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                    <em>24H</em>
                </MenuItem>
                    <MenuItem value={10}>24H</MenuItem>
                    <MenuItem value={20}>24H</MenuItem>
                    <MenuItem value={30}>24H</MenuItem>
                
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
        </Box>
    </>
  )
}
