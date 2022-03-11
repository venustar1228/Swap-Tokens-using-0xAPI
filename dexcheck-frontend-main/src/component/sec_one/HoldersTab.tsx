import React from 'react'
import { 
    Box, 
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';


function createData(name:any, calories:any, fat:any, infos:any, carbs:any) {
    return { name, calories, fat, infos, carbs };
  }
  
  const rows = [
    createData('13B CXPAD', '14.94%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '2.30%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '14.94%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData('25 Dec 2021, 10:15:01', '11.63%', <span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
  ];


export default function HoldersTab() {
  return (
    <>
        <Box className="hldr_main_box">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>BALANCE</TableCell>
                        <TableCell align="center">PERCENTAGE</TableCell>
                        <TableCell align="left">ADDRESS</TableCell>
                        <TableCell align="center">INFOS</TableCell>
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
                        <TableCell align="left" className="blue_txt">{row.fat}</TableCell>
                        <TableCell align="center">{row.infos}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
  )
}
