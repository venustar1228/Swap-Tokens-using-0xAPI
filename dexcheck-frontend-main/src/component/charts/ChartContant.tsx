import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useQuery, gql } from '@apollo/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { accountEllipsis } from '../../utils/common';
import { formatStringNumber } from '../../utils/formatBalance';

const PAIR_INFO = gql`
  query pairInfo($pairInfoInput: PairInfoInput) {
    pairInfo(pairInfoInput: $pairInfoInput) {
      name
      token0
      token1
      totalSupply
      token0Reserve
      token1Reserve
      totalLiquidity
      poolCreated
      totalTx
      marketCap
      dailyVolume
      targetTokenTotalSupply
      targetTokenInBnb
      targetTokenPooledPercentage
      token0Symbol
      token1Symbol
      targetToken
    }
  }
`;

export default function ChartContant({ pairToken, chainId, network }: any) {
  const [age, setAge] = React.useState('');

  const [tokenMeta, setTokenMeta] = useState({
    image: {
      small: '',
      large: '',
      thumb: '',
    },
    links: {
      twitter_screen_name: '',
      telegram_channel_identifier: '',
      homepage: [],
      official_forum_url: [],
    },
  });

  const [pairData, setPairData] = useState({
    name: '',
    token0: '',
    totalLiquidity: '',
    token0Symbol: '',
    token1Symbol: '',
    totalTx: '',
    marketCap: '',
    token0Reserve: '',
    token1Reserve: '',
    targetTokenPooledPercentage: '',
    totalSupply: '',
    targetTokenInBnb: '',
    targetTokenTotalSupply: '',
  });

  const { data, loading, error } = useQuery(PAIR_INFO, {
    variables: {
      pairInfoInput: {
        network: network,
        address: pairToken,
      },
    },
  });

  useEffect(() => {
    const arrangeData = async () => {
      setPairData(data?.pairInfo);
      network = network === 'bsc' ? 'binance-smart-chain' : network;
      const tokenMetaData = await axios(
        'https://api.coingecko.com/api/v3/coins/' +
          network +
          '/contract/' +
          data.pairInfo.token0
      );

      const circSupply = await axios(
        'https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82&apikey=N13Y1UFY7NB2MVC4G5BUNVY3UK3G6GJWYC'
      );

      // const holders = await axios(
      //   'https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&apikey=N13Y1UFY7NB2MVC4G5BUNVY3UK3G6GJWYC'
      // );

      console.log('holders', circSupply);

      setTokenMeta(tokenMetaData.data);
    };

    if (data) {
      arrangeData();
    }
  }, [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Box className='chrt_cntnt_main_bx'>
        <Box className='chrt_lft_cntnt'>
          <Box className='lft_innr'>
            <Box className='wbnb_bx'>
              <Box component='img' src='/img/wbnb_logo.png' alt='' />
              <Typography component='h4'>WBNB</Typography>
              <Box component='img' src='/img/verify_ic.svg' alt='' />
            </Box>
            <Box component='img' src='/img/rounded_arrw_ic.svg' alt='' />
          </Box>
          <Typography component='h1'>
            $0.00011084
            <span>
              0.57%
              <Box component='img' src='/img/red_tkn.svg' alt='' />
            </span>
          </Typography>
        </Box>
        <Box className='chrt_cntr_cntnt'>
          <Box className='def_cntr_innr'>
            <Box className='innr_top'>
              <Box component='img' src='/img/total_market_cap.svg' alt='' />
              <Typography>Total Market Cap</Typography>
            </Box>
            <Typography component='h6'>
              {' '}
              ${formatStringNumber(pairData?.marketCap)}
            </Typography>
          </Box>
          <Box className='def_cntr_innr'>
            <Box className='innr_top'>
              <Box component='img' src='/img/total_liquidity.svg' alt='' />
              <Typography>Total Liquidity</Typography>
            </Box>
            <Typography component='h6'>
              {' '}
              ${formatStringNumber(pairData?.totalLiquidity)}
            </Typography>
          </Box>
          <Box className='def_cntr_innr'>
            <Box className='innr_top'>
              <Box component='img' src='/img/daily_volume.svg' alt='' />
              <Typography>Daily Volume</Typography>
            </Box>
            <Typography component='h6'>-</Typography>
          </Box>
          <Box className='def_cntr_innr'>
            <Box className='innr_top'>
              <Box component='img' src='/img/holders.svg' alt='' />
              <Typography>Holders</Typography>
            </Box>
            <Typography component='h6'>-</Typography>
          </Box>
          <Box className='def_cntr_innr'>
            <Box className='innr_top'>
              <Box component='img' src='/img/circulating_supply.svg' alt='' />
              <Typography>Circulating Supply</Typography>
            </Box>
            <Typography component='h6'>
              -{/* ${formatStringNumber(pairData?.totalSupply)} */}
            </Typography>
          </Box>
        </Box>
        <Box className='chrt_rght_cntnt'>
          <Button>
            Contract
            <Box component='img' src='/img/contact_heart.svg' alt='' />
          </Button>
          <Box className='lnks_slct_bx lft_slct_box '>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value=''>
                  <em>Links</em>
                </MenuItem>
                <MenuItem value={10}>one</MenuItem>
                <MenuItem value={20}>two</MenuItem>
                <MenuItem value={30}>three</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button className='img_btn'>
            <Box component='img' src='/img/tranperent_heart.svg' alt='' />
          </Button>
          <Button className='img_btn'>
            <Box component='img' src='/img/share_ic.svg' alt='' />
          </Button>
        </Box>
      </Box>
    </>
  );
}
