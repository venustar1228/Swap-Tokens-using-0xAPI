import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { formatNumber } from '../../utils/formatBalance';
import { format } from 'date-fns';
import { getNetworkURI } from '../../helpers/networkURIHelper';
import { accountEllipsis } from '../../utils/common';
import ReactTimeAgo from 'react-time-ago';

interface Data {
  id: any;
  event: any;
  timestamp: any;
  type: any;
  targetTokenAmount: any;
  maker: any;
  transactionHash: any;
  priceBNB: any;
  priceUSD: any;
  totalBNB: any;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

type Order = 'asc' | 'desc';

function createData(
  type: any,
  price: any,
  price_bnb: any,
  amount: any,
  age: any,
  maker: any,
  infos: any,
  action: any
) {
  return { type, price, price_bnb, amount, age, maker, infos, action };
}

const rows = [
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>20 Sec</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='red_txt'>SELL</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>32 Sec</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>1 Min</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>3 Min</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='red_txt'>SELL</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>30 Min</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>1 Hour</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='red_txt'>SELL</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>3 Hours</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='red_txt'>SELL</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>3 Hours</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>3 Hours</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
  createData(
    <Typography className='grrn_txt'>BUY</Typography>,
    '$0.50225998',
    '0.00092468',
    '$396.92163',
    <Typography className='flx_no_wrap'>3 Hours</Typography>,
    <span className='blue_maker_txt'>0xa89b12...5a1e</span>,
    <Box className='infos_dtl'>
      <Box component='img' src='/img/action_img_01.png' alt='' />
      <span className='red_03'>03</span>
    </Box>,
    <Typography className='flx_no_wrap'>Track Wallet</Typography>
  ),
];

const EXCHANGE_RATES = gql`
  subscription PairExplorerSync($pairExplorerSyncInput: PairExplorerSyncInput) {
    pairExplorerSync(pairExplorerSyncInput: $pairExplorerSyncInput) {
      event
      timestamp
      transactionHash
      type
      targetTokenAmount
      maker
      priceBNB
      priceUSD
      totalBNB
    }
  }
`;

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'DATE',
  },
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'TYPE',
  },
  {
    id: 'priceUSD',
    numeric: true,
    disablePadding: false,
    label: 'PRICE USD',
  },
  {
    id: 'priceBNB',
    numeric: true,
    disablePadding: false,
    label: 'PRICE BNB',
  },
  {
    id: 'targetTokenAmount',
    numeric: true,
    disablePadding: false,
    label: 'AMOUNT DEXT',
  },
  {
    id: 'totalBNB',
    numeric: true,
    disablePadding: false,
    label: 'TOTAL BNB',
  },
  {
    id: 'maker',
    numeric: true,
    disablePadding: false,
    label: 'MAKER',
  },
  {
    id: 'transactionHash',
    numeric: true,
    disablePadding: false,
    label: 'Others',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span'>{order === 'desc' ? '' : ''}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TradingHistory({ pairToken, network, chainId }: any) {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('timestamp');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [txData, settxData] = useState<any>([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { data, loading, error } = useSubscription(EXCHANGE_RATES, {
    variables: {
      pairExplorerSyncInput: {
        network: network,
        address: pairToken,
      },
    },
  });

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    const arrangeData = () => {
      settxData([...txData, data?.pairExplorerSync]);
    };

    if (data) {
      arrangeData();
    }
  }, [data]);

  return (
    <>
      <Box className='trdng_hstry_mian_bx'>
        <Box className='deftbl'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              {/* <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={() => null}
                onRequestSort={handleRequestSort}
                rowCount={txData.length}
              /> */}
              <TableHead>
                <TableRow>
                  <TableCell>
                    TYPE
                    <Box
                      component='img'
                      className='arrw_img'
                      src='/img/up_down_arrw.svg'
                      alt=''
                    />
                  </TableCell>
                  <TableCell>
                    PRICE
                    <span className='usd_txt'>USD</span>
                    <Box component='img' src='/img/usd_rplc_ic.svg' alt='' />
                    <Box
                      component='img'
                      className='arrw_img'
                      src='/img/dawn_arrw.svg'
                      alt=''
                    />
                  </TableCell>
                  <TableCell>
                    PRICE BNB
                    <Box
                      component='img'
                      className='up_arrw_img'
                      src='/img/dawn_arrw.svg'
                      alt=''
                    />
                  </TableCell>
                  <TableCell>
                    AMOUNT
                    <span className='usd_txt'>USD</span>
                    <Box component='img' src='/img/usd_rplc_ic.svg' alt='' />
                    <Box
                      component='img'
                      className='up_arrw_img'
                      src='/img/dawn_arrw.svg'
                      alt=''
                    />
                  </TableCell>
                  <TableCell>AGE</TableCell>
                  <TableCell>MAKER</TableCell>
                  <TableCell>INFOS</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(txData.reverse(), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(txData.timestamp);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        // key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          className={
                            row.type == 'Sell'
                              ? 'type_txt sell_txt'
                              : 'type_txt buy_txt'
                          }
                        >
                          {row.type}
                        </TableCell>
                        <TableCell>
                          ${formatNumber(Number(row.priceUSD), 2, 6)}
                        </TableCell>
                        <TableCell>
                          {formatNumber(Number(row.priceBNB), 2, 6)}
                        </TableCell>
                        <TableCell>
                          {formatNumber(Number(row.targetTokenAmount), 2, 6)}
                        </TableCell>
                        <TableCell>
                          <ReactTimeAgo
                            date={Number(row.timestamp) * 1000}
                            locale='en-US'
                          />
                          {/* {format(
                            new Date(Number(row.timestamp) * 1000),
                            "yyyy-MM-dd' 'HH:mm:ss"
                          )} */}
                        </TableCell>
                        <TableCell>
                          <a
                            href={getNetworkURI(chainId) + row.maker}
                            target='_blank'
                            style={{ color: 'white' }}
                          >
                            {accountEllipsis(row.maker.toString())}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Box className='infos_dtl'>
                            <a
                              href={
                                'https://bscscan.com/tx/' + row.transactionHash
                              }
                              target='_blank'
                            >
                              <Box
                                component='img'
                                src='/img/action_img_01.png'
                                alt=''
                              />
                            </a>
                            <span className='red_03'>03</span>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography className='flx_no_wrap'>
                            Track Wallet
                          </Typography>
                        </TableCell>
                        {/*<TableCell>{row.maker}</TableCell>
                        <TableCell>{row.infos}</TableCell>
                        <TableCell>{row.action}</TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
