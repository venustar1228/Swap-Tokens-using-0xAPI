import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Grid, Button, Tabs, Tab } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Typography from '@mui/material/Typography';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { formatNumber } from '../../utils/formatBalance';
import { format } from 'date-fns';
import { accountEllipsis } from '../../utils/common';
import { getNetworkURI, gettxURI } from '../../helpers/networkURIHelper';
import DetailTab from '../sec_one/DetailTab';
import NewsTab from '../sec_one/NewsTab';
import HoldersTab from '../sec_one/HoldersTab';
import TradingHistory from '../charts/TradingHistory';
import BigSwapExplorer from '../../pages/BigSwapExplorer';
import Buyer from '../charts/Buyer';
import Sellers from '../charts/Sellers';

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

type Order = 'asc' | 'desc';

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
// This is for Tab
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SecOne({ pairToken, network, chainId }: any) {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('timestamp');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [txData, settxData] = useState<any>([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.date);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - txData.length) : 0;

  const { data, loading, error } = useSubscription(EXCHANGE_RATES, {
    variables: {
      pairExplorerSyncInput: {
        network: network,
        address: pairToken,
      },
    },
  });

  useEffect(() => {
    const arrangeData = () => {
      settxData([...txData, data?.pairExplorerSync]);
    };

    if (data) {
      arrangeData();
    }
  }, [data]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className='main_tb_box'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box className='tradin_h5 tab_box'>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons='auto'
                    aria-label='scrollable auto tabs example'
                  >
                    <Tab label='Trading History' {...a11yProps(0)} />
                    <Tab label='Holders' {...a11yProps(1)} />
                    <Tab label='Buyers' {...a11yProps(2)} />
                    <Tab label='Sellers' {...a11yProps(3)} />
                    <Tab label='Details' {...a11yProps(4)} />
                    <Tab label='News' {...a11yProps(5)} />
                  </Tabs>
                </Box>
              </Box>
              {/* <Typography component='h4' variant='h5'>
                Trading History
              </Typography>
              <Typography>DEXT ( Last 510 Trades )</Typography> */}
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Box className='box_btn'>
              <Button className='big_btn'>My Positions</Button>
              <Button className='big_btn'>Price Alerts</Button>
            </Box>
          </Grid> */}
          <Box className='tbpnnl'>
            <TabPanel value={value} index={0}>
              <TradingHistory
                network={network}
                chainId={chainId}
                pairToken={pairToken}
              />
              {/* <Grid item xs={12}>
              <Box sx={{ width: '100%' }} className='deftbl'>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={() => null}
                      onRequestSort={handleRequestSort}
                      rowCount={txData.length}
                    />
                    <TableBody>
                      if you don't need to support IE11, you can replace the `stableSort` call with:
                                    rows.slice().sort(getComparator(order, orderBy))
                      {stableSort(txData.reverse(), getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(txData.timestamp);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => null}
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                            >
                              <TableCell
                                component='th'
                                id={labelId}
                                scope='row'
                                padding='none'
                              >
                                {format(
                                  new Date(Number(row.timestamp) * 1000),
                                  "yyyy-MM-dd' 'HH:mm:ss"
                                )}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={
                                    row.type === 'Sell'
                                      ? 'type_txt sell_txt'
                                      : 'type_txt buy_txt'
                                  }
                                >
                                  {row.type}
                                </span>{' '}
                              </TableCell>
                              <TableCell>
                                ${formatNumber(Number(row.priceUSD), 2, 6)}
                              </TableCell>
                              <TableCell>
                                {formatNumber(Number(row.priceBNB), 2, 6)}
                              </TableCell>
                              <TableCell>
                                {formatNumber(
                                  Number(row.targetTokenAmount),
                                  2,
                                  6
                                )}
                              </TableCell>
                              <TableCell>
                                {formatNumber(Number(row.totalBNB), 2, 6)}
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
                                <a
                                  href={gettxURI(chainId) + row.transactionHash}
                                  target='_blank'
                                  style={{ color: 'white' }}
                                >
                                  {accountEllipsis(
                                    row.transactionHash.toString()
                                  )}
                                </a>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={txData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className='tblpgntn'
                />
              </Box>
            </Grid> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <HoldersTab />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Buyer />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Sellers />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <DetailTab />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <NewsTab />
            </TabPanel>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
