import React from 'react'
import { 
    Box, 
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormHelperText,
    OutlinedInput ,
    SelectChangeEvent,
    useFormControl,
  } from '@mui/material';

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

export default function DexCheckAggregator() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
  return (
    <>
        <Box className="dx_swp_main_bx dxchk_arrggtr_bx">
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
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                    <MenuItem value="">
                                        <em>Select</em>
                                    </MenuItem>
                                        <MenuItem value={10}><img src="/img/bnb_ic.svg" width="18" />BNB</MenuItem>
                                        <MenuItem value={20}><img src="/img/bnb_ic.svg" width="18" />BNB</MenuItem>
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
                            {/* <Typography className="max_txt">MAX</Typography> */}
                            <Box className="slct_bx lft_slct_box">
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
                                        <MenuItem value={10}><img src="/img/bnb_ic.svg" width="18" />BOG</MenuItem>
                                        <MenuItem value={20}><img src="/img/bnb_ic.svg" width="18" />BOG</MenuItem>
                                        <MenuItem value={30}><img src="/img/bnb_ic.svg" width="18" />BOG</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box className="mddl_bttm_bx">
                        <Typography component="h5">SELECT YOUR TOKEN</Typography>
                    </Box> */}
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
                    <Button className="cnnct_wllt_btn">CONNECT WALLET</Button>
                </Box>
                <Box className="smmry_bttm_bx">
                    <Typography className="lght_txt smmmry_txt">Summary</Typography>
                    <Box className="smmry_innr">
                        <Typography className="lght_txt">BNB Price:</Typography>
                        <Typography>$404.44</Typography>
                    </Box>
                    <Box className="smmry_innr">
                        <Typography className="lght_txt">BOG Price:</Typography>
                        <Typography>$0.86432</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
