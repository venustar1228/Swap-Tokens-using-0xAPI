import React from 'react'
import { Box, Typography, IconButton, Divider, Button, Grid } from '@mui/material'

export default function Footer() {
    return (
        <>
            <Box component="footer" className="footer">
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12} sm={6}>
                        <ul className="scl_lnks">
                            
                            <li>
                                <a href='#' target="_blank"><Box component="img" src="/img/sc_ic_02.svg" /></a>
                            </li>
                            <li>
                                <a href='#' target="_blank"><Box component="img" src="/img/sc_ic_03.svg" /></a>
                            </li>
                            <li>
                                <a href='#' target="_blank"><Box component="img" src="/img/sc_ic_04.svg" /></a>
                            </li>
                            <li>
                                <a href='#' target="_blank"><Box component="img" src="/img/sc_ic_05.svg" /></a>
                            </li>
                            <li>
                                <a href='#' target="_blank"><Box component="img" src="/img/sc_ic_06.svg" /></a>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>© DEXTools.io 2021. All Rights Reserved.</Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
