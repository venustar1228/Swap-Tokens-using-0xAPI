import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Grid, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { accountEllipsis, convert } from '../../utils/common';
import { formatStringNumber } from '../../utils/formatBalance';
import ReactTimeAgo from 'react-time-ago';

interface Data {
  tokenName: string;
  pairAddress: any;
  listedSince: string;
  actions: string;
  priceInBnb: string;
  priceInUsd: string;
  poolAmount: string;
  totalLiquidity: string;
  poolVariation: string;
  poolRemaining: string;
}

// function createData(
//   pair_info: any,
//   listed_since: any,
//   token_price_usd: string,
//   total_liquidity: string,
//   pool_amount: string,
//   variation: any,
//   pool_remaining: any,
//   contract: any,
//   action: any
// ): Data {
//   return {
//     pair_info,
//     listed_since,
//     token_price_usd,
//     total_liquidity,
//     pool_amount,
//     variation,
//     pool_remaining,
//     contract,
//     action,
//   };
// }

// const rows = [
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.14942806',
//     '$3,507.07',
//     '0.05 ETH',
//     [<Typography className='grrn_txt'>933.74%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_01.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.00000003727',
//     '$66,993.46',
//     '10 ETH',
//     [<Typography className='yllw_txt'>-1.61%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_02.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.0000001279',
//     '$1,181,381.34',
//     '100 ETH',
//     [<Typography className='grrn_txt'>933.74%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_03.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.0000001279',
//     '$1,181,381.34',
//     '100 ETH',
//     [<Typography className='red_txt'>-100%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_04.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.14942806',
//     '$3,507.07',
//     '0.05 ETH',
//     [<Typography className='grrn_txt'>933.74%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_05.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
//   createData(
//     [
//       <Typography className='pair_info_h4' component='h4'>
//         WETH/WOWQ<span>0X4A7A90...09C5</span>
//       </Typography>,
//     ],
//     [
//       <Typography className='listed_since_txt'>
//         1 <span>D</span> 32 <span>M</span> 49 <span>S</span>
//       </Typography>,
//     ],
//     '$0.14942806',
//     '$3,507.07',
//     '0.05 ETH',
//     [<Typography className='grrn_txt'>933.74%</Typography>],
//     [<Typography>0.5172 ETH</Typography>],
//     [<Box component='img' src='/img/contract_ic_01.svg' width='20px' />],
//     [
//       <Box className='action_img_box'>
//         <Box component='img' src='/img/action_img_01.png' width='20px' />
//         <Box component='img' src='/img/action_img_02.png' width='20px' />
//         <Box component='img' src='/img/action_img_03.png' width='20px' />
//         <Box component='img' src='/img/action_img_04.png' width='20px' />
//         <Box component='img' src='/img/action_img_05.png' width='20px' />
//       </Box>,
//     ]
//   ),
// ];

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
    id: 'pairAddress',
    numeric: false,
    disablePadding: true,
    label: 'Pair Info',
  },
  {
    id: 'listedSince',
    numeric: true,
    disablePadding: false,
    label: 'LISTED SINCE',
  },
  {
    id: 'priceInUsd',
    numeric: true,
    disablePadding: false,
    label: 'TOKEN PRICE USD (ETH)',
  },
  {
    id: 'totalLiquidity',
    numeric: true,
    disablePadding: true,
    label: 'TOTAL LIQUIDITY',
  },
  {
    id: 'poolAmount',
    numeric: true,
    disablePadding: false,
    label: 'POOL AMOUNT',
  },
  {
    id: 'poolVariation',
    numeric: true,
    disablePadding: false,
    label: 'VARIATION',
  },
  {
    id: 'poolRemaining',
    numeric: true,
    disablePadding: true,
    label: 'POOL REMAINING',
  },
  // {
  //   id: 'contract',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'CONTRACT',
  // },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS',
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
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
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

// Search bar //
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
    },
  },
}));

const NEW_PAIR = gql`
  query poolExplorerHistory($poolInput: PoolInput) {
    poolExplorerHistory(poolInput: $poolInput) {
      name
      address
      createdAtTimestamp
      initialLiquidity
      priceInBnb
      priceInUsd
      totalLiquidity
      poolVariation
      poolAmount
      poolRemaining
    }
  }
`;

const NEW_PAIR_SUBSCRIPTION = gql`
  subscription ($newPairAddedInput: NewPairAddedInput) {
    newPairAdded(newPairAddedInput: $newPairAddedInput) {
      name
      address
      createdAtTimestamp
      initialLiquidity
      priceInBnb
      priceInUsd
      totalLiquidity
      poolVariation
      poolAmount
      poolRemaining
    }
  }
`;

export default function PairsTable({ network, chainId, routerAddress }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('listedSince');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [pairData, setPairData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const { data, loading, error } = useQuery(NEW_PAIR, {
    variables: {
      poolInput: {
        network: network,
      },
    },
  });

  const {
    data: dataSub,
    loading: loadingSub,
    error: errorSub,
  } = useSubscription(NEW_PAIR_SUBSCRIPTION, {
    variables: {
      newPairAddedInput: {
        network: network,
      },
    },
  });

  useEffect(() => {
    const arrangeData = () => {
      setPairData([...data?.poolExplorerHistory]);
      console.log(data?.poolExplorerHistory);
    };
    if (data) {
      arrangeData();
    }
  }, [data]);

  useEffect(() => {
    const arrangeData = () => {
      console.log(dataSub?.newPairAdded);
      // console.log([...pairData, dataSub?.poolExplorerSync]);
      setPairData([...pairData, dataSub?.newPairAdded]);
    };
    if (dataSub && !loading && pairData) {
      arrangeData();
    }
  }, [dataSub, loading]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = pairData.map((n: any) => n.pairAddress);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pairData.length) : 0;
  return (
    <>
      <Box className='main_tb_box'>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <Box className='tradin_h5 for_flex_box'>
              <Typography component='h4' variant='h5'>
                Live New Pairs
              </Typography>
              <Typography>
                New pairs listed on Ethereum exchanges with pool variation in
                real time
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box className='search_bx'>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Find by symbol, name, token contract or pair address'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
            {/* <Box className='box_btn'>
                    <Button className='big_btn'>
                        My Positions
                    </Button>
                    <Button className="big_btn">
                        Price Alerts
                    </Button>               
                  </Box> */}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }} className='deftbl pairs_tb_box'>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={() => null}
                    onRequestSort={handleRequestSort}
                    rowCount={pairData.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                  rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(
                      pairData.reverse(),
                      getComparator(order, orderBy)
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index) => {
                        const isItemSelected = isSelected(row.address);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.address)}
                            role='checkbox'
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.address}
                            selected={isItemSelected}
                          >
                            <TableCell
                              component='th'
                              id={labelId}
                              scope='row'
                              padding='none'
                            >
                              <Typography
                                className='pair_info_h4'
                                component='h4'
                              >
                                {row.name}
                                <span>
                                  {row.address && accountEllipsis(row.address)}
                                </span>{' '}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <ReactTimeAgo
                                date={
                                  row.createdAtTimestamp &&
                                  Number(row.createdAtTimestamp)
                                }
                                locale='en-US'
                              />
                            </TableCell>
                            <TableCell align='center'>
                              {formatStringNumber(
                                convert(row.priceInUsd).toString(),
                                2,
                                16
                              )}
                            </TableCell>
                            {/* <TableCell align='center'>
                              {formatStringNumber(row.initialLiquidity)}
                            </TableCell> */}
                            <TableCell align='center'>
                              {formatStringNumber(row.totalLiquidity)}
                            </TableCell>
                            <TableCell align='center'>
                              {formatStringNumber(row.poolAmount)}
                            </TableCell>
                            <TableCell align='center'>
                              {row.poolVariation}
                            </TableCell>
                            <TableCell align='center'>
                              {row.poolRemaining === null
                                ? '-'
                                : row.poolRemaining + ' BNB'}
                            </TableCell>
                            {/* <TableCell align='center'>{row.contract}</TableCell> */}
                            {/* <TableCell align='right'>{row.action}</TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={pairData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className='tblpgntn'
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
