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
import { fontSize } from '@mui/system';
import { CollectionsOutlined } from '@mui/icons-material';

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
    

    const [fromAmount, setFromAmount] = React.useState(0);
    const [toAmount, setToAmount] = React.useState(0);
    const [age, setAge] = React.useState('');
    let fromAmount_f;

    const wbnb_addr = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const usdt_addr = "0x55d398326f99059fF775485246999027B3197955";   //usdt address on bsc
    const zero_addr = "0x6A2fF57Bf92A825995d2c1e013a9E73FF4813958";   //zero smart contract address
    const eth_addr = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const dai_addr = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";

    const wbnb_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];
    const usdt_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const zero_abi = [
        {
          "inputs": [
            {
              "internalType": "contract IERC20TokenV06",
              "name": "inputToken",
              "type": "address"
            },
            {
              "internalType": "contract IERC20TokenV06",
              "name": "outputToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "exchangeProxy",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "swap",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ];
    const dai_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    const [buyToken, setBuyToken] = React.useState(usdt_addr);
    const [sellToken, setSellToken] = React.useState(wbnb_addr);
    const [buyTokenABi, setBuyTokenABi] = React.useState(usdt_addr);
    const [sellTokenABi, setSellTokenABi] = React.useState(wbnb_abi);
    const [sellAmount, setSellAmount] = React.useState("100000000000000000");
    const [disable, setDisable] = React.useState(true);

    const amount = "1000000000000000000000";
    

    const handleChange1 = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        let tempValue = event.target.value;
        if(tempValue == 10) {
            setSellToken(wbnb_addr);
            setSellTokenABi(wbnb_abi);
        }
        else if(tempValue == 20) {
            setSellToken(usdt_addr);
            setSellTokenABi(usdt_abi);
        }
        else if(tempValue == 30) {
            setSellToken(dai_addr);
            setSellTokenABi(dai_abi);
        }
        console.log("first sellToken: ", sellToken);
    };

    const [age2, setAge2] = React.useState('');
    const handleChange2 = (event: SelectChangeEvent) => {
        setAge2(event.target.value);
        let tempValue2 = event.target.value;
        if(tempValue2 == 40) {
            setBuyToken(wbnb_addr);
            setBuyTokenABi(wbnb_abi);
        }
        else if(tempValue2 == 50) {
            setBuyToken(usdt_addr);
            setBuyTokenABi(usdt_abi);
        }
        else if(tempValue2 == 60) {
            setBuyToken(dai_addr);
            setBuyTokenABi(dai_abi);
        }
        console.log("first sellToken: ", sellToken);
    }

    let myContract = new web3.eth.Contract(sellTokenABi as AbiItem[], sellToken);
    
    let zeroContract = new web3.eth.Contract(zero_abi as AbiItem[], zero_addr);

    const connect_wallet = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let accounts = await web3.eth.requestAccounts();      
        setDisable(false);
    }

    const approveHandler = async (event: MouseEvent<HTMLButtonElement>) => { //handler when approve button clicked
        event.preventDefault();
        // let accounts = await web3.eth.requestAccounts();

        console.log(myContract, zeroContract);
        console.log("zero_addr", zero_addr);
        await  approve_token("usdt", myContract, zero_addr, amount);
    }


    const estimateGas = async function(contract, func, args = [], options) {
        try {
            let accounts = await web3.eth.requestAccounts();
            const gasAmount = await contract.methods[func](...args).estimateGas(Object.assign({from: accounts[0]}, options));
            return {
                success: true,
                gas: gasAmount
            }
        } catch(e) {
            if(e.message.startsWith("Internal JSON-RPC error.")) {
                e = JSON.parse(e.message.substr(24));
            }
            return {
                success: false,
                gas: -1,
                message: e.message
            }
        }
    }
    

    const runSmartContract = async (contract:any, func:any, args = [], options) => {        

        let accounts = await web3.eth.requestAccounts();
        
        if(accounts.length == 0) {
            alert("accounts.length = 0");
            return false;
        }

        if(!contract) return false;
        if(!contract.methods[func]) return false;
        const promiEvent = await contract.methods[func](...args).send(Object.assign({ from: accounts[0] }, options)); //this doesn't work now.
        console.log("result", promiEvent);
        return promiEvent;        
    }

    const approve_token = async (token_name:any, contract:any, spender:any, amount:any) => {

       // console.log(token_name);
        
        let accounts = await web3.eth.requestAccounts();
        console.log("accounts.length", accounts.length);

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
    //sellAmount = "100000000000000000";
    const swapTokenHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        fromAmount_f = parseFloat(fromAmount);
        let tempFromAmount = fromAmount_f;
        fromAmount_f = fromAmount_f * 10 ** 18;
        console.log("fromAmount_f", fromAmount_f.toString());
        setSellAmount(fromAmount_f.toString());
    //    sellAmount = fromAmount_f;
    //    console.log("sellAmount:", sellAmount);
        
          //@ts-ignore
        console.log("sellToken: ", sellToken);
        const { data: response } = await axios.get("http://localhost:8080/bsc/quote", {
            params: {
              buyToken, sellToken, sellAmount
            }    
        })
        console.log("response: ", response);
        // const tx = await runSmartContract(zeroContract, "swap",
        //     [response.sellTokenAddress, response.buyTokenAddress, response.sellAmount, response.to, response.data,
        //     {value:response.value}]);
        //sellToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        console.log("buyToken:", buyToken);
        console.log("sellToken: ", sellToken);
        let buyTokenRate = response.buyTokenToEthRate;
        let sellTokenRate = response.sellTokenToEthRate;
        let tempToAmount = fromAmount * buyTokenRate / sellTokenRate;
        tempToAmount = tempToAmount.toFixed(2);
        setToAmount(tempToAmount);
        console.log("zeroContract: ", zeroContract);
        console.log("sellAmount: ", sellAmount);
        console.log("response.value: ", response.value);
        
        console.log("params", sellToken, buyToken, sellAmount, response.to, response.data);
        const {success, gas, message}  = await estimateGas(zeroContract, "swap", [sellToken, buyToken, sellAmount, response.to, response.data], {value: response.value}); 
        if(!success) {
            alert(message);
            return;
        }
        const tx = await runSmartContract(zeroContract, "swap",
            [sellToken, buyToken, sellAmount, response.to, response.data], {value: response.value, gas: gas.toString()});
        console.log("tx: ", tx);
        //return tx;
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
                                            <OutlinedInput style={{ color: 'white', borderColor: 'initial', fontStyle: 'bold', fontSize: '30px'}} value={fromAmount} onChange={(evt) => setFromAmount(evt.target.value)}></OutlinedInput>
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
                                    <Typography component="h2">{toAmount}</Typography>
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
                        {
                            disable 
                            ?
                                <Box style={{ display: 'block' }} className='approve_btn_bx'>
                                    <Button className="cnnct_wllt_btn" style={{ width: '100%'}} onClick={connect_wallet}>Connect Wallet</Button>
                                </Box>
                            :
                                <Box style={{ display: 'block' }} className='approve_btn_bx'>
                                    <Button disabled={disable} style={{ float: 'left' }} className="cnnct_wllt_btn" onClick={approveHandler}>APPROVE</Button>
                                    <Button disabled={disable} style={{ float: 'right' }} className="cnnct_wllt_btn" onClick={swapTokenHandler} >SWAP TOKEN</Button>
                                </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}
