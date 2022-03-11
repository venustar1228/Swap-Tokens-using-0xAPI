import React from 'react';
import { Box, Grid } from '@mui/material';
import EtherTools from '../component/home/EtherTools';
import TopSwaps from '../component/home/TopSwaps';
import TrendingPairs from '../component/home/TrendingPairs';
import HighestVolumeTokens from '../component/home/HighestVolumeTokens';
import HoldersGrowth from '../component/home/HoldersGrowth';
import Favorites from '../component/home/Favorites';
import UpcomingLaunches from '../component/home/UpcomingLaunches';
import Header from '../elements/Header';

export default function Landing() {
  return (
    <>
    <Box className='hm_main hedr_slct_show'>
      <Header />
        <Grid container spacing={0}>
          {/* <Grid item lg={3} xs={12}>
            <EtherTools />
          </Grid> */}
          <Grid item lg={12} xs={12}>
            <Grid container spacing={4}>
              <Grid item md={4} xs={12}>
                <TrendingPairs />
              </Grid>
              <Grid item md={4} xs={12}>
                <TopSwaps />
              </Grid>
              <Grid item md={4} xs={12}>
                <HighestVolumeTokens />
              </Grid>
              <Grid item md={4} xs={12}>
                <HoldersGrowth />
              </Grid>
              <Grid item md={4} xs={12}>
                <Favorites />
              </Grid>
              <Grid item md={4} xs={12}>
                <UpcomingLaunches />
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </>
  )
}
