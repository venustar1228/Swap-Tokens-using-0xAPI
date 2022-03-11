import React from 'react'
import { Box, Grid } from '@mui/material';
import WalletInfo from '../component/wallet_tracking/WalletInfo';
import SavedWallet from '../component/wallet_tracking/SavedWallet';
import Header from '../elements/Header';

export default function WalletTracking() {
  return (
    <>
        <Box className='hm_main'>
            <Header />
            <Grid container spacing={4}>
                <Grid item lg={8} xs={12}>
                    <WalletInfo />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <SavedWallet />
                </Grid>
            </Grid>
        </Box>
    </>
  )
}
