import React from 'react'
import { Box, Typography } from '@mui/material';

export default function NewsTab() {
  return (
    <>
        <Box className="news_main_box">
            <Box className="nws_innr">
                <Box component="img" src='/img/news_img.png' />
                <Typography>Sorry, no news available for this token.</Typography>
            </Box>
        </Box>
    </>
  )
}
