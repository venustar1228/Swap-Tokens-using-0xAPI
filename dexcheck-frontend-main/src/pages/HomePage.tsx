import React from 'react';
import { Box, Grid, Stack, Pagination } from '@mui/material';
import SecOne from '../component/home/SecOne';
import SecThree from '../component/home/SecThree';
import { useParams } from 'react-router-dom';
import { getChaindId } from '../helpers/networkURIHelper';
import { TVChartContainer } from '../component/TVChartContainer';
import HotPairs from '../component/hot-pairs';
import EtherTools from '../component/home/EtherTools';
import TopSwaps from '../component/home/TopSwaps';
import TrendingPairs from '../component/home/TrendingPairs';
import HighestVolumeTokens from '../component/home/HighestVolumeTokens';
import HoldersGrowth from '../component/home/HoldersGrowth';
import DexCheckAggregator from '../component/charts/DexCheckAggregator';
import ChartContant from '../component/charts/ChartContant';
import Header from '../elements/Header';

export default function HomePage() {
  let { network, pairToken } = useParams();
  const chainId = getChaindId(network ? network : '');

  return (
    <>
      <Box className='hm_main hedr_slct_none'>
        <Header />
        <Grid container spacing={4}>
          {/* <Grid item lg={3} xs={12}>
            <EtherTools />
          </Grid> */}
          {/* <Grid item lg={9} xs={12}>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <TopSwaps />
              </Grid>
              <Grid item md={6} xs={12}>
                <TrendingPairs />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item md={6} xs={12}>
            <HighestVolumeTokens />
          </Grid> */}
          {/* <Grid item md={6} xs={12}>
            <HoldersGrowth />
          </Grid> */}
          <Grid item xs={12}>
            {/* <HotPairs network={network} /> */}
            <ChartContant
              network={network}
              chainId={chainId}
              pairToken={pairToken}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* <SecThree
              network={network}
              chainId={chainId}
              pairToken={pairToken}
            /> */}
            <DexCheckAggregator />
          </Grid>
          <Grid item xs={12} lg={8}>
            {/* <Box
              component='img'
              src='/img/graph_img.png'
              className='img-fluid'
              alt=''
            /> */}
            <TVChartContainer />
          </Grid>
          <Grid item xs={12}>
            <SecOne network={network} chainId={chainId} pairToken={pairToken} />
          </Grid>
          <Grid item xs={12}>
            <Box className="pgntn_bx">
              <Stack spacing={0}>
                <Pagination count={11} showFirstButton showLastButton />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
