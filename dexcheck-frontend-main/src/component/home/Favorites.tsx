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
    Typography,
    FormControl 
  } from '@mui/material';
import HoldersTab from '../sec_one/HoldersTab';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SelectHours from './SelectHours';

function createData(name:any, calories:any, fat:any, carbs:any){
    return { name, calories, fat , carbs};
  }
  
  const rows = [
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="red_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="grrn_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="red_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="grrn_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="red_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="grrn_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="red_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="grrn_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="red_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
    createData(<Box className="name_here_bx">NameHere</Box>,'$0.00011084',<Typography className="grrn_nmbr">0.57%</Typography>,<Box component="img" src="/img/heart_ic.svg" alt="" />),
  ];


export default function Favorites() {
  return (
    <>
        <Box className="tp_swp_box">
            <Box className="tpswp_innr">
                <Box className="hdng_bx">
                    <Typography component="h1" className="def_h1">Favorites</Typography>
                    <SelectHours />
                </Box>
                <Box className="hldr_main_box ">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            {/* <TableRow>
                                <TableCell>BALANCE</TableCell>
                                <TableCell align="center">PERCENTAGE</TableCell>
                                <TableCell align="left">ADDRESS</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow> */}
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
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="left">{row.carbs}</TableCell>
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
