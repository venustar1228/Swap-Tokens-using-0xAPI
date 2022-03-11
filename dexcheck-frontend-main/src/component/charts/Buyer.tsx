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


function createData(wallet:any, ttl_bought:any, holding:any, wallet_size:any, infos:any, carbs:any) {
    return { wallet, ttl_bought, holding, wallet_size, infos, carbs };
  }
  
  const rows = [
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
    createData(<span className="blue_maker_txt">0x3422bf5ae689d01d1c6924b80c1f595b1d54213c</span>,<Typography className="grrn_txt">$18,094.59</Typography>,'15443','$15,351.58',<Box component="img" src="/img/action_img_01.png" alt="" />,'Track Wallet'),
  ];


export default function Buyer() {
  return (
    <>
        <Box className="hldr_main_box">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>WALLET</TableCell>
                        <TableCell align="center">TOTAL BOUGHT</TableCell>
                        <TableCell align="center">COINNAME HOLDING</TableCell>
                        <TableCell align="center">WALLET SIZE</TableCell>
                        <TableCell align="center">INFOS</TableCell>
                        <TableCell align="center">ACTION</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.wallet}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.wallet}
                        </TableCell>
                        <TableCell align="center">{row.ttl_bought}</TableCell>
                        <TableCell align="center" className="blue_txt">{row.holding}</TableCell>
                        <TableCell align="center">{row.wallet_size}</TableCell>
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
