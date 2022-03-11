import React from 'react'
import { 
    Box, 
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
  } from '@mui/material';


function createData(name:any, calories:any, fat:any) {
    return { name, calories, fat };
    }

    const rows = [
    createData(<Box className="name_here_box"><span className="mane_bg_01"></span><Typography>NameHere</Typography></Box>,'NO',<Box component="img" src='/img/three_dots_ic.svg' />),
    createData(<Box className="name_here_box"><span className="mane_bg_02"></span><Typography>NameHere</Typography></Box>,'YES',<Box component="img" src='/img/three_dots_ic.svg' />),
    createData(<Box className="name_here_box"><span className="mane_bg_03"></span><Typography>NameHere</Typography></Box>,'NO',<Box component="img" src='/img/three_dots_ic.svg' />),
    ];


export default function SavedWallet() {
  return (
    <>
        <Box className="saved_wllt_main_bx sm_hght">
            <Box className="saved_tp_bx">
                <Typography component="h1" className="def_h1 ">Saved Wallet</Typography>
                <Typography>Subscribed members can have a maximum 500 wallets.</Typography>
            </Box>
            <Box className="saved_wllt_table">
                <Box className="hldr_main_box">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>NAME</TableCell>
                                <TableCell align="center">BOT</TableCell>
                                <TableCell align="center">ACTION</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center" className="blue_txt">{row.fat}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    </>
  )
}
