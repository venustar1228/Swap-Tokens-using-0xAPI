import React from 'react';
import { Box, Grid, Stack, Pagination } from '@mui/material';
import PairsTable from '../component/new-pairs/PairsTable';
import { useParams } from 'react-router-dom';
import { getChaindId } from '../helpers/networkURIHelper';
import HotPairs from '../component/hot-pairs';
import NewLivePairs from '../component/new-pairs/NewLivePairs';
import Header from '../elements/Header';

export default function LiveNewPairs() {
  let { network, routerAddress } = useParams();
  const chainId = getChaindId(network ? network : '');
  return (
    <>
      <Box className='hm_main hedr_slct_none'>
        <Header />
        <Grid container spacing={4}>
          {/* <Grid item xs={12}>
            <HotPairs network={network} />
          </Grid> */}
          <Grid item xs={12}>
            {/* <PairsTable
              network={network}
              chainId={chainId}
              routerAddress={routerAddress}
            /> */}
            <NewLivePairs
              network={network}
              chainId={chainId}
              routerAddress={routerAddress}
            />
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
