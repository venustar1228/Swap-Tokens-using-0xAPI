import React, { useState, Component, MouseEvent } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
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
        event.preventDefault();
        let accounts = await web3.eth.requestAccounts(console.log);
    }

    const approveHandler = async (event: MouseEvent<HTMLButtonElement>) => { //handler when approve button clicked
        event.preventDefault();
        let accounts = await web3.eth.requestAccounts();
        console.log(accounts);
        await approve_token("usdt", myContract, spender, amount);
    }

    const usdt_addr = "0x377533D0E68A22CF180205e9c9ed980f74bc5050";   //usdt address on bsc
    const spender = "0x357ebe12b3CA3d8Df5747bf5EfF7cEBaEC0e28Fb";   //zero smart contract address
    const amount = "1000000000000000000000";

    const runSmartContract = async (contract:any, func:any, args = []) => {
        let accounts = await web3.eth.requestAccounts();
        if(accounts.length == 0) return false;
        if(!contract) return false;
        if(!contract.methods[func]) return false;
        const promiEvent = contract.methods[func](...args).send({ from: accounts[0] });
        return promiEvent;        
    }
    
    const usdt_abi = [{"inputs":[{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    let myContract = new web3.eth.Contract(usdt_abi as AbiItem[], usdt_addr);
    const approve_token = async (token_name:any, contract:any, spender:any, amount:any) => {
        try{
            //@ts-ignore
            await runSmartContract(contract, "approve", [spender, amount]);
        }catch(e){
            return false;
        }
        return true;
    }
    const swapTokenHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        alert('token swap button clicked');
        
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
