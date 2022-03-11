import React from 'react';
import { Box, Grid, Stack, Pagination  } from '@mui/material';
import BigSwapTable from '../component/big-swap-sxplorer/BigSwapTable';
import HotPairs from '../component/hot-pairs';
import { useParams } from 'react-router-dom';
import Header from '../elements/Header';

export default function BigSwapExplorer() {
  let { network, pairToken } = useParams();
  return (
    <>
      <Box className='hm_main hedr_slct_none'>
        <Header />
        <Grid container spacing={4}>
          {/* <Grid item xs={12}>
            <HotPairs network={network} />
          </Grid> */}
          <Grid item xs={12}>
            <BigSwapTable />
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
