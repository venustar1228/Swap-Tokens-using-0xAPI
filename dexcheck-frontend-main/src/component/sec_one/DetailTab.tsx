import React from 'react'
import { Box, Typography } from '@mui/material';

export default function DetailTab() {
return (
    <>
        <Box className="dtltb_main_bx">
            <Box className="typo_main">
                <Typography component="h2">CXPAD Live Price Chart</Typography>
                <Typography>Cex / Dex Multi-Chain IDO Launchpad. CoinxPad is where you get access to <br/>the best new tokens before they list on other centralized or decentralized exchanges.</Typography>
                <Typography component="h3">
                    <Box component="img" src='/img/dtltb_ic_01.svg' />
                    CXPAD's liquidity backs <span className="clrng_txt"> 23.61% </span> of the marketcap.
                </Typography>
                <Typography component="h3">
                    <Box component="img" src='/img/dtltb_ic_02.svg' />
                    CXPAD has a supply of <span className="blue_clr_txt"> 100,000,000,000 </span> <br/> with a circulating supply of <span className="blue_clr_txt"> 86,999,999,999</span>.
                </Typography>
            </Box>

        </Box>
    </>
  )
}
