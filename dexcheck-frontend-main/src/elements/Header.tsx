import React from 'react'
import {Box ,
        Grid, 
        Button,
        InputLabel ,
        FormControl ,
        NativeSelect ,
        Input 
    } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Header() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Box component="header" className="as_header">
                <Box className="hhdr_innr_bx">
                    <Box className="lft_slct_box slct_none_bx">
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                                <MenuItem value={10}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                                <MenuItem value={20}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                                <MenuItem value={30}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className="cntr_srch_box">
                        <Input placeholder="Search for any token..."  />
                        {/* https://codesandbox.io/s/rvqvo?file=/src/Beer.jsx */}
                        {/* https://codesandbox.io/s/table-search-bar-dynamic-fileds-mvnbt */}
                        <Box component="img" src='/img/inpt_search_ic.svg' className="srch_icon" />
                    </Box>
                    <Box className="rght_btn_box">
                        <Button variant="outlined" className="cnnct_wllt_btn">CONNECT WALLET</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
