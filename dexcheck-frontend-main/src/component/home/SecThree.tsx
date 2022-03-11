import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import { useQuery, gql } from '@apollo/client';
import { formatNumber, formatStringNumber } from '../../utils/formatBalance';
import axios from 'axios';
import { accountEllipsis } from '../../utils/common';

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

export default function SecThree({ pairToken, chainId, network }: any) {
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
      setTokenMeta(tokenMetaData.data);
    };
    if (data) {
      arrangeData();
    }
  }, [data]);

  return (
    <>
      <Box className='def_box'>
        <Box className='bx_head'>
          <Box className='lft_head'>
            <Box component='img' src={tokenMeta && tokenMeta.image.small} />
            <Typography component='h6'>
              {pairData.name.replace('-', '/')}
            </Typography>
            <VerifiedIcon />
          </Box>
          <Box className='rgt_head'>
            <IconButton aria-label='delete'>
              <StarIcon />
            </IconButton>
            <IconButton aria-label='delete'>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className='prz_bx'>
          <Typography component='h2'>$0.00011084</Typography>
          <Typography className='tkn_sm_rt tkn_sm_rt_red'>
            0.57
            <Box component='img' src='/img/red_tkn.svg' />
          </Typography>
        </Box>
        <Divider className='as_dvdr' />
        <Box className='tknaddrss'>
          <Typography>
            Token Address: <span>{accountEllipsis(pairData.token0)}</span>
          </Typography>
          <Button
            variant='outlined'
            size='small'
            className='small_btn'
            onClick={() => {
              navigator.clipboard.writeText(pairData.token0);
            }}
          >
            <Box component='img' src='/img/copy_icon.svg' /> COPY
          </Button>
        </Box>
        <ul className='scl_lnks'>
          <li>
            <a href={tokenMeta.links.homepage[0]} target='_blank'>
              <Box component='img' src='/img/sc_ic_01.svg' />
            </a>
          </li>
          <li>
            <a
              href={
                'https://twitter.com/' + tokenMeta.links.twitter_screen_name
              }
              target='_blank'
            >
              <Box component='img' src='/img/sc_ic_02.svg' />
            </a>
          </li>
          <li>
            <a
              href={
                'https://t.me/' + tokenMeta.links.telegram_channel_identifier
              }
              target='_blank'
            >
              <Box component='img' src='/img/sc_ic_03.svg' />
            </a>
          </li>
          <li>
            <a href={tokenMeta.links.official_forum_url[0]} target='_blank'>
              <Box component='img' src='/img/sc_ic_05.svg' />
            </a>
          </li>
          {/* <li>
            <a
              href={
                'https://twitter.com/' + tokenMeta.links.twitter_screen_name
              }
              target='_blank'
            >
              <Box component='img' src='/img/sc_ic_05.svg' />
            </a>
          </li> */}
        </ul>
        <Divider className='as_dvdr' />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_01.svg' /> Total
                Liquidity
              </Typography>
              <Typography component='h4'>
                ${formatStringNumber(pairData?.totalLiquidity)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_02.svg' /> Daily Volume
              </Typography>
              <Typography component='h4'>$ -</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_03.svg' /> Pooled{' '}
                {pairData.token0Symbol}
              </Typography>
              <Typography component='h4'>
                {formatStringNumber(pairData.token0Reserve)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_03.svg' /> Pooled{' '}
                {pairData.token1Symbol}
              </Typography>
              <Typography component='h4'>
                {formatStringNumber(pairData.token1Reserve)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_04.svg' /> Total TX
              </Typography>
              <Typography component='h4'>{pairData.totalTx}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_05.svg' /> Holders
              </Typography>
              <Typography component='h4'>-</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_06.svg' /> Total Market
                Cap
              </Typography>
              <Typography component='h4'>
                ${formatStringNumber(pairData.marketCap)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_06.svg' /> % Pooled{' '}
                {pairData.token0Symbol}
              </Typography>
              <Typography component='h4'>
                ${formatStringNumber(pairData.targetTokenPooledPercentage)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_06.svg' /> Total Supply
              </Typography>
              <Typography component='h4'>
                ${formatStringNumber(pairData.targetTokenTotalSupply)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className='other_info'>
              <Typography>
                <Box component='img' src='/img/other_ic_06.svg' /> 1{' '}
                {pairData.token1Symbol} :
              </Typography>
              <Typography component='h4'>
                {formatStringNumber(pairData.targetTokenInBnb)}{' '}
                {pairData.token0Symbol}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='outlined'
              className='big_btn w-100'
              startIcon={<InfoIcon />}
            >
              More Info
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
