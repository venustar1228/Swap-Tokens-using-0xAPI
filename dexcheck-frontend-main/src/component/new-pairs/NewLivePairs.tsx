import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Grid, Button, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { accountEllipsis, convert } from '../../utils/common';
import { formatStringNumber } from '../../utils/formatBalance';
import ReactTimeAgo from 'react-time-ago';
import { StringLiteralLike } from 'typescript';

interface Data {
  chain: string;
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

function createData(
  chain: any,
  pair_info: any,
  action: any,
  price_usd: any,
  ttl_lqdty: any,
  poolamount: any,
  poolremaining: any,
  infos: any
) {
  return {
    chain,
    pair_info,
    action,
    price_usd,
    poolamount,
    ttl_lqdty,
    poolremaining,
    infos,
  };
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
    id: 'chain',
    numeric: false,
    disablePadding: true,
    label: 'Chain',
  },
  {
    id: 'pairAddress',
    numeric: false,
    disablePadding: true,
    label: 'Pair Info',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'ACTIONS',
  },

  {
    id: 'priceInUsd',
    numeric: true,
    disablePadding: false,
    label: 'TOKEN PRICE USD (ETH)',
  },
  {
    id: 'poolVariation',
    numeric: true,
    disablePadding: false,
    label: 'VARIATION',
  },
  {
    id: 'totalLiquidity',
    numeric: true,
    disablePadding: true,
    label: 'TOTAL LIQUIDITY',
  },
  {
    id: 'poolVariation',
    numeric: true,
    disablePadding: false,
    label: 'VARIATION',
  },
  //   {
  //     id: 'poolAmount',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'POOL AMOUNT',
  //   },

  //   {
  //     id: 'poolRemaining',
  //     numeric: true,
  //     disablePadding: true,
  //     label: 'POOL REMAINING',
  //   },
  {
    id: 'listedSince',
    numeric: true,
    disablePadding: false,
    label: 'LISTED SINCE',
  },
  // {
  //   id: 'contract',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'CONTRACT',
  // },
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
export default function NewLivePairs({ network, chainId, routerAddress }: any) {
  const [age, setAge] = React.useState('');
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('listedSince');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [pairData, setPairData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
      let a: any = [];
      data?.poolExplorerHistory.map((data: any) => {
        a.push(
          createData(
            <Button className='def_chain_btn bsc_btn'>
              {network.toUpperCase()}
            </Button>,
            <Typography>
              {data.name}
              <span className='smll_txt'>{accountEllipsis(data.address)}</span>
            </Typography>,
            <Box className='action_img_box'>
              <Box component='img' src='/img/action_img_01.png' width='20px' />
              <Box component='img' src='/img/action_img_02.png' width='20px' />
              <Box component='img' src='/img/action_img_03.png' width='20px' />
              <Box component='img' src='/img/action_img_04.png' width='20px' />
              <Box component='img' src='/img/action_img_05.png' width='20px' />
            </Box>,
            '$' +
              formatStringNumber(convert(data.priceInUsd).toString(), 2, 16),
            '$' + formatStringNumber(data.totalLiquidity),
            <Typography className='grrn_txt'>{data.poolAmount}%</Typography>,

            <Typography className='grrn_txt'>{data.poolRemaining}%</Typography>,

            <Typography className='flx_no_wrap'>
              {' '}
              <ReactTimeAgo
                date={
                  data.createdAtTimestamp && Number(data.createdAtTimestamp)
                }
                locale='en-US'
              />
            </Typography>
          )
        );
      });
      setPairData([...a]);
    };
    if (data) {
      arrangeData();
    }
  }, [data]);

  useEffect(() => {
    const arrangeData = () => {
      const data = dataSub?.newPairAdded;
      console.log(data);
      setPairData([
        createData(
          <Button className='def_chain_btn bsc_btn'>
            {network.toUpperCase()}
          </Button>,
          <Typography>
            {data.name}
            <span className='smll_txt'>{accountEllipsis(data.address)}</span>
          </Typography>,
          <Box className='action_img_box'>
            <Box component='img' src='/img/action_img_01.png' width='20px' />
            <Box component='img' src='/img/action_img_02.png' width='20px' />
            <Box component='img' src='/img/action_img_03.png' width='20px' />
            <Box component='img' src='/img/action_img_04.png' width='20px' />
            <Box component='img' src='/img/action_img_05.png' width='20px' />
          </Box>,
          '$' + formatStringNumber(convert(data.priceInUsd).toString(), 2, 16),
          '$' + formatStringNumber(data.totalLiquidity),
          <Typography className='grrn_txt'>{data.poolAmount}%</Typography>,

          <Typography className='grrn_txt'>{data.poolRemaining}%</Typography>,

          <Typography className='flx_no_wrap'>
            {' '}
            <ReactTimeAgo
              date={data.createdAtTimestamp && Number(data.createdAtTimestamp)}
              locale='en-US'
            />
          </Typography>
        ),
        ...pairData,
      ]);
    };
    if (dataSub && pairData) {
      arrangeData();
    }
  }, [dataSub, loading]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Box className='new_live_pairs_main_bx dfrnt_slct'>
        <Box className='main_tb_box'>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={1}>
              <Box className='lft_slct_box'>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=''>
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={10}>
                      <img src='/img/bnb.svg' width='18' />
                      Binance
                    </MenuItem>
                    <MenuItem value={20}>
                      <img src='/img/bnb.svg' width='18' />
                      Binance
                    </MenuItem>
                    <MenuItem value={30}>
                      <img src='/img/bnb.svg' width='18' />
                      Binance
                    </MenuItem>
                  </Select>
                  {/* <FormHelperText>Without label</FormHelperText> */}
                </FormControl>
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
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }} className='deftbl'>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={() => null}
                      onRequestSort={handleRequestSort}
                      rowCount={pairData.length}
                    />
                    {/* <TableHead>
                      <TableRow>
                        <TableCell>CHAIN</TableCell>
                        <TableCell>
                          PAIR INFO
                          <Box
                            component='img'
                            className='up_arrw_img'
                            src='/img/dawn_arrw.svg'
                            alt=''
                          />
                        </TableCell>
                        <TableCell>ACTIONS</TableCell>
                        <TableCell>
                          PRICE USD
                          <Box
                            component='img'
                            className='up_arrw_img'
                            src='/img/up_down_arrw.svg'
                            alt=''
                          />
                        </TableCell>
                        <TableCell>
                          VARIATION
                          <Box
                            component='img'
                            className='up_arrw_img'
                            src='/img/up_down_arrw.svg'
                            alt=''
                          />
                        </TableCell>
                        <TableCell>TOTAL LIQUIDITY</TableCell>
                        <TableCell>
                          VARIATION
                          <Box
                            component='img'
                            className='up_arrw_img'
                            src='/img/up_down_arrw.svg'
                            alt=''
                          />
                        </TableCell>
                        <TableCell>ACTION</TableCell>
                      </TableRow>
                    </TableHead> */}
                    <TableBody>
                      {stableSort(
                        pairData.reverse(),
                        getComparator(order, orderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row: any, index) => (
                          <TableRow
                            // key={row.name}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {row.chain}
                            </TableCell>
                            <TableCell>{row.pair_info}</TableCell>
                            <TableCell>{row.action}</TableCell>
                            <TableCell>{row.price_usd}</TableCell>
                            <TableCell>5%</TableCell>
                            <TableCell>{row.ttl_lqdty}</TableCell>
                            <TableCell>5%</TableCell>
                            {/* <TableCell>{row.poolremaining}</TableCell> */}
                            <TableCell>{row.infos}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
