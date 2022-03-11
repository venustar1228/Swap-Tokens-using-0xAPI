import React from 'react'
import { alpha } from '@mui/material/styles';
import { Box, Grid, Typography, Input, Button, Tabs, Tab, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import WalletInfoTabPanel from './WalletInfoTabPanel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Search = styled('div')(({ theme }) => ({
position: 'relative',
borderRadius: theme.shape.borderRadius,
backgroundColor: alpha(theme.palette.common.white, 0.15),
'&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
},
marginLeft: 0,
width: '100%',
[theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: '12ch',
    },
},
}));


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    }
    
    function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }
    
    function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }

const ariaLabel = { 'aria-label': 'description' };

export default function WalletInfo() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [age, setAge] = React.useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
  return (
    <>
        <Box className="wllt_inf_main_bx sm_hght">
            <Box className="wllt_inf_top_bx">
                <Typography component="h1" className="def_h1 ">Wallet info</Typography>
                <Typography>It shows all the info of a given wallet on Binance chain.</Typography>
                <Box className='wllt_page_sechbr'>
                    <Box className="cntr_srch_box">
                        <Input placeholder="Enter wallet address (i.e. 0xa0f85981bb8c91872bef116664fb8994995e54d8)"  />
                        <Box component="img" src='/img/inpt_search_ic.svg' className="srch_icon" />
                    </Box>
                </Box>
                <Box className="bttm_cntnt">
                    <Box className="bttm_lft_bx">
                        <span>0xa0f85981bb8c91872bef116664fb8994995e54d8</span>
                        <Box component="img" src="/img/action_img_01.png" alt="" />
                    </Box>
                    <Box className="bttm_rght_btn_bx">
                        <Button className="cnnct_wllt_btn ">Save Wallet Address</Button>
                    </Box>
                </Box>
            </Box>
            <Box className="wwlt_inf_bttm_bx">
                <Box className='tab_box ordr_one'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example">
                            <Tab label="Token List" {...a11yProps(0)} />
                            <Tab label="Trade History" {...a11yProps(1)} />
                        </Tabs>
                        </Box>
                    </Box>
                </Box>
                {/* <Box className="wllt_ttl_value">
                    <Box className="ttl_vl_tp">
                        <Typography>Wallet Total Value:</Typography>
                        <Typography component="h2">$253.63</Typography>
                    </Box>
                    <Box className="ttl_vl_bttm">
                        <Typography>0.09302 ETH</Typography>
                    </Box>
                </Box> */}
                <Box className="wllt_ttl_value fltr_slct_bx">
                    <Typography className="fltr_tx_txt">Filter tx by:</Typography>
                    <Box className="lft_slct_box">
                        <FormControl sx={{ minWidth: 80 }}>
                            <Select
                            value={age}
                            onChange={handleChangeSelect}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>All Exchanges</em>
                            </MenuItem>
                                <MenuItem value={10}>Exchanges</MenuItem>
                                <MenuItem value={20}>Exchanges</MenuItem>
                                <MenuItem value={30}>Exchanges</MenuItem>
                            
                            </Select>
                            {/* <FormHelperText>Without label</FormHelperText> */}
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box className="tbpnl_bx">
                <TabPanel value={value} index={0}>
                    <WalletInfoTabPanel />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <WalletInfoTabPanel />
                </TabPanel>
            </Box>
        </Box>
    </>
  )
}
