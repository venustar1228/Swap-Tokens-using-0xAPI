import React from 'react'
import { 
    Box, 
    Typography
  } from '@mui/material';

export default function UpcomingLaunches() {
  return (
    <>
        <Box className="upcmng_lch_main_bx">
            <Box className="upcmng_innr">
                <Typography component="h1" className="def_h1">Upcoming Launches</Typography>
                <Box className="def_innr_boxes">
                    <Box className="txt_cntnt_bx">
                        <Typography>Lorem ipsum goes here</Typography>
                        <Typography className="lght_txt">Launching at 3 PM on 24th Feb 2020</Typography>
                    </Box>
                    <Box className="arrw_cntnt_bx">
                        <Box component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="def_innr_boxes">
                    <Box className="txt_cntnt_bx">
                        <Typography>Lorem ipsum goes here</Typography>
                        <Typography className="lght_txt">Launching at 3 PM on 24th Feb 2020</Typography>
                    </Box>
                    <Box className="arrw_cntnt_bx">
                        <Box component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="def_innr_boxes">
                    <Box className="txt_cntnt_bx">
                        <Typography>Lorem ipsum goes here</Typography>
                        <Typography className="lght_txt">Launching at 3 PM on 24th Feb 2020</Typography>
                    </Box>
                    <Box className="arrw_cntnt_bx">
                        <Box component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
                <Box className="def_innr_boxes">
                    <Box className="txt_cntnt_bx">
                        <Typography>Lorem ipsum goes here</Typography>
                        <Typography className="lght_txt">Launching at 3 PM on 24th Feb 2020</Typography>
                    </Box>
                    <Box className="arrw_cntnt_bx">
                        <Box component="img" src="/img/vrtcl_arrw_ic.svg" alt="" />
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
