import React from 'react'
import Web3 from 'web3';
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

let web3: Web3;
if (Web3.givenProvider) {
    web3 = new Web3(Web3.givenProvider);
}

export default function Header() {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    //@ts-ignore

    const connectWalletHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("new connection button clicked");
        let accounts = await web3.eth.requestAccounts();
        if(accounts.length == 0) {
            alert("note connect");
        }
    }
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
                        <Button variant="outlined" className="cnnct_wllt_btn" onClick={connectWalletHandler}>CONNECT WALLET</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
