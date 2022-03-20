//@ts-nocheck
import React, { useState, Component, MouseEvent } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
import axios, { AxiosResponse } from 'axios';
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

    const wbnb_addr = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const usdt_addr = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";   //usdt address on bsc
    const zero_addr = "0x357ebe12b3CA3d8Df5747bf5EfF7cEBaEC0e28Fb";   //zero smart contract address
    const eth_addr = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const dai_addr = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";

    const wbnb_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
    const usdt_abi = [{"inputs":[{"internalType":"uint256","name":"_totalSupply","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const zero_abi = [{"inputs":[{"internalType":"contract IERC20TokenV06","name":"inputToken","type":"address"},{"internalType":"contract IERC20TokenV06","name":"outputToken","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"exchangeProxy","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"}];
    const dai_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    let sellTokenABi = usdt_abi;
    let buyTokenABi = dai_abi;

    let buyToken = usdt_addr;
    let sellToken = dai_addr;

    const amount = "1000000000000000000000";

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        let tempValue = event.target.value;
        if(tempValue == 10) {
            sellToken = wbnb_addr;
            sellTokenABi = wbnb_abi;
        }
        else if(tempValue == 20) {
            sellToken = usdt_addr;
            sellTokenABi = usdt_abi;
        }
        else if(tempValue == 30) {
            sellToken = dai_addr;
            sellTokenABi = dai_abi;
        }
    };

    const [age2, setAge2] = React.useState('');
    const handleChange2 = (event: SelectChangeEvent) => {
        setAge2(event.target.value);
        let tempValue2 = event.target.value;
        if(tempValue2 == 40) {
            buyToken = wbnb_addr;
            buyTokenABi = wbnb_abi;
        }
        else if(tempValue2 == 50) {
            buyToken = usdt_addr;
            buyTokenABi = usdt_abi;
        }
        else if(tempValue2 == 60) {
            buyToken = dai_addr;
            buyTokenABi = dai_abi;
        }
    }

    let myContract = new web3.eth.Contract(buyTokenABi as AbiItem[], buyToken);
    
    let zeroContract = new web3.eth.Contract(zero_abi as AbiItem[], zero_addr);
    

    const connectWalletHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let accounts = await web3.eth.requestAccounts();
    }

    const approveHandler = async (event: MouseEvent<HTMLButtonElement>) => { //handler when approve button clicked
        event.preventDefault();
        // let accounts = await web3.eth.requestAccounts();

        console.log(myContract, zeroContract);
        console.log("zero_addr", zero_addr);
        await  approve_token("dai", myContract, zero_addr, amount);
    }

    const runSmartContract = async (contract:any, func:any, args = []) => {        

        let accounts = await web3.eth.requestAccounts();
        
        if(accounts.length == 0) {
            alert("accounts.length = 0");
            return false;
        }

        if(!contract) return false;
        if(!contract.methods[func]) return false;
        console.log(func + " is invoked")
        console.log("args", args)
;        const promiEvent = await contract.methods[func](...args).send({ from: accounts[0] }); //this doesn't work now.
        console.log("result", promiEvent);
        return promiEvent;        
        // await contract.methods[func](...args).send({ from: accounts[0] });
    }

    const sellAmount = "1000000000000000000";

    const approve_token = async (token_name:any, contract:any, spender:any, amount:any) => {

        console.log(token_name);
        

        try{
            //@ts-ignore

            // const current = await contract.methods.approval(spender).call();
            // console.log("Current Approval", current);            
            
            await runSmartContract(contract, "approve", [spender, amount]);
        }catch(e){
            return false;
        }
        return true;
    }
    
    const swapTokenHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        alert('token swap button clicked');
          //@ts-ignore
        const { data: response } = await axios.get("http://localhost:8080/bsc/quote", {
            params: {
              buyToken, sellToken, sellAmount
            }    
        })
        
        const tx = await runSmartContract(zeroContract, "swap",
            [response.sellTokenAddress, response.buyTokenAddress, response.sellAmount, response.to, response.data,
            {value:response.value}]);
        console.log(tx);
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
                                    {/* <Typography component="h2">0.0</Typography> */}
                                    <Box className="inpt_bx">
                                        <FormControl sx={{ width: '25ch' }}>
                                            <OutlinedInput />
                                            <span className="prsttg_abslt"></span>
                                        </FormControl>
                                    </Box>
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
                                                <MenuItem value={10}><img src="/img/eth_ic.png" width="18" />BNB</MenuItem>
                                                <MenuItem value={20}><img src="/img/usdc_ic.png" width="18" />USDT</MenuItem>
                                                <MenuItem value={30}><img src="/img/bnb_ic.svg" width="18" />DAI</MenuItem>
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
                                                <MenuItem value={40}><img src="/img/eth_ic.png" width="18" />BNB</MenuItem>
                                                <MenuItem value={50}><img src="/img/usdc_ic.png" width="18" />USDT</MenuItem>
                                                <MenuItem value={60}><img src="/img/bnb_ic.svg" width="18" />DAI</MenuItem>
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
