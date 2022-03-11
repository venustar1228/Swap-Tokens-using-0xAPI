import React from 'react'
import { 
    Box, 
    Typography
  } from '@mui/material';
import SelectHours from './SelectHours';
export default function EtherTools() {
  return (
    <>
        <Box className="ehthr_main_bx">
            <Box className="ethr_innr">
                <Box className="hdng_bx">
                    <Typography component="h1" className="def_h1">Ether Tools</Typography>
                    <SelectHours />
                </Box>
                <Box className="ehrt_link_bx">
                    <Box component="a" href="#" className="def_link_bx">
                        <Box className="lnk_innr">
                            <Box className="lft_ic" component="img" src="/img/bigswapexplorer_ic.svg" alt="" />
                            <Typography>Pair Explorer</Typography>
                        </Box>
                        <Box className="arrw_ic" component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="ehrt_link_bx">
                    <Box component="a" href="#" className="def_link_bx">
                        <Box className="lnk_innr">
                            <Box className="lft_ic" component="img" src="/img/new_pairs_icon.svg" alt="" />
                            <Typography>New Pairs</Typography>
                        </Box>
                        <Box className="arrw_ic" component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="ehrt_link_bx">
                    <Box component="a" href="#" className="def_link_bx">
                        <Box className="lnk_innr">
                            <Box className="lft_ic" component="img" src="/img/bigswaps_icon.svg" alt="" />
                            <Typography>Big Swaps</Typography>
                        </Box>
                        <Box className="arrw_ic" component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="ehrt_link_bx">
                    <Box component="a" href="#" className="def_link_bx">
                        <Box className="lnk_innr">
                            <Box className="lft_ic" component="img" src="/img/trackedwallets_icon.svg" alt="" />
                            <Typography>Tracked Wallets</Typography>
                        </Box>
                        <Box className="arrw_ic" component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="ehrt_link_bx">
                    <Box component="a" href="#" className="def_link_bx brdr_nn">
                        <Box className="lnk_innr">
                            <Box className="lft_ic" component="img" src="/img/Stats_icon.svg" alt="" />
                            <Typography>Ether Stats</Typography>
                        </Box>
                        <Box className="arrw_ic" component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
