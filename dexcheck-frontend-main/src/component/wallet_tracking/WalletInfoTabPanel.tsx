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


function createData(name:any, calories:any, fat:any, infos:any) {
    return { name, calories, fat, infos };
  }
  
  const rows = [
    createData(<Box className="symbol_bx"><Box component="img" src='/img/dext_symbol.png' /><Typography>DEXT - DEXTools</Typography></Box>,'1,000.00','0.09293 ETH','$253.37'),
  ];


export default function WalletInfoTabPanel() {
  return (
    <>
        <Box className="hldr_main_box">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>SYMBOL</TableCell>
                        <TableCell align="center">TOTAL</TableCell>
                        <TableCell align="left">VALUE <span className="usd_txt">ETH</span></TableCell>
                        <TableCell align="center">VALUE <span className="usd_txt">USD</span></TableCell>
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
                        <TableCell align="left" className="blue_txt">{row.fat}</TableCell>
                        <TableCell align="center">{row.infos}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
  )
}
