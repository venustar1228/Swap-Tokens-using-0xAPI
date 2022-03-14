import React, { useState, Component, MouseEvent } from 'react';
import Web3 from 'web3';
import {
    Box,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Checkbox,
    FormHelperText,
    OutlinedInput,
    useFormControl
} from '@mui/material';
import Header from '../elements/Header';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is being focused';
        }

        return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
}


let web3: Web3;
if (Web3.givenProvider) {
    web3 = new Web3(Web3.givenProvider);
}

export default function DexSwap() {
    const [age, setAge] = React.useState('');

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [age2, setAge2] = React.useState('');
    const handleChange2 = (event: SelectChangeEvent) => {
        setAge2(event.target.value);
    }

    const connectWalletHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        let accounts = await web3.eth.requestAccounts();
        alert(accounts);
    }

    const approveHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        alert('approve button cliecked');
    }

    const swapTokenHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        alert('token swap button clicked');
        // const accounts = await web3.eth.getAccounts();
        // setMessage('Waiting on transaction success...');
        // await lottery.methods.enter().send({
        // from: accounts[0],
        // value: web3.utils.toWei(value, 'ether'),
        // });
        // setMessage('You have been entered!');
    }
    return (
        <>
            <Box className='hm_main hedr_slct_none'>
                <Header />
                <Box className="dx_swp_main_bx">
                    <Box className="dxswp_innr">
                        <Box className="aggrgtr_bx">
                            <Box className="agrgtr_lft">
                                <Typography component="h4">DexCheck Aggregator</Typography>
                            </Box>
                            <Box className="agrgtr_rght">
                                <Button className="gwei_btn">5 Gwei</Button>
                                <Button className="img_btn">
                                    <Box component="img" src="/img/gas_station_ic.svg" alt="" />
                                </Button>
                                <Button className="img_btn">
                                    <Box component="img" src="/img/setting_ic.svg" alt="" />
                                </Button>
                            </Box>
                        </Box>
                        <Box className="dxswp_mddl_bx">
                            <Box className="mddl_top_bx">
                                <Box className="frm_bx">
                                    <Typography>From</Typography>
                                    <Typography component="h2">0.0</Typography>
                                </Box>
                                <Box className="slct_main_bx">
                                    <Typography className="max_txt">MAX</Typography>
                                    <Box className="slct_bx lft_slct_box">
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                                value={age}
                                                onChange={handleChange1}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select</em>
                                                </MenuItem>
                                                <MenuItem value={10}><img src="/img/eth_ic.png" width="18" />ETH</MenuItem>
                                                <MenuItem value={20}><img src="/img/usdc_ic.png" width="18" />USDC</MenuItem>
                                                <MenuItem value={30}><img src="/img/bnb_ic.svg" width="18" />BNB</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="rplc_btn_bx">
                                <Button>
                                    <Box component="img" src="/img/rplc_ic.svg" alt="" />
                                </Button>
                            </Box>

                            <Box className="mddl_top_bx">
                                <Box className="frm_bx">
                                    <Typography>To</Typography>
                                    <Typography component="h2">0.0</Typography>
                                </Box>
                                <Box className="slct_main_bx">
                                    <Box className="slct_bx lft_slct_box">
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                                value={age2}
                                                onChange={handleChange2}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select</em>
                                                </MenuItem>
                                                <MenuItem value={40}><img src="/img/eth_ic.png" width="18" />ETH</MenuItem>
                                                <MenuItem value={50}><img src="/img/usdc_ic.png" width="18" />USDC</MenuItem>
                                                <MenuItem value={60}><img src="/img/bnb_ic.svg" width="18" />BNB</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="auto_txt_btn">
                            <Box className="flex_bx">
                                <Typography>AutoTax</Typography>
                                <Box component="img" src="/img/error_ic.svg" alt="" />
                            </Box>
                            <Checkbox {...label} />
                            <Box className="flex_bx">
                                <Typography>Slippage</Typography>
                                <Box component="img" src="/img/error_ic.svg" alt="" />
                            </Box>
                            <Box className="inpt_bx">
                                <FormControl sx={{ width: '25ch' }}>
                                    <OutlinedInput />
                                    <span className="prsttg_abslt">%</span>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className="cnnct_wllt_btn_bx">
                            <Button className="cnnct_wllt_btn" onClick={connectWalletHandler}>CONNECT WALLET</Button>
                        </Box>
                        <Box style={{ display: 'block' }} className='approve_btn_bx'>
                            <Button style={{ float: 'left' }} className="cnnct_wllt_btn" onClick={approveHandler}>APPROVE</Button>
                            <Button style={{ float: 'right' }} className="cnnct_wllt_btn" onClick={swapTokenHandler} >SWAP TOKEN</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
