import React from 'react'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import {Box , Grid, Button, FormControl} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface Data {
    chain: any;
    pair: string;
    execution_time: string;
    type: number;
    quantity: string;
    total_eth: string;
    total_usd: string;
    variation: string;
    maker: string;
    action: string;
  }
  
  function createData(
    chain: any,
    pair: any,
    execution_time: any,
    type: any,
    quantity: string,
    total_eth: string,
    total_usd: string,
    variation: any,
    maker: any,
    action: any,
  ): Data {
    return {
      chain,
      pair,
      execution_time,
      type,
      quantity,
      total_eth,
      total_usd,
      variation,
      maker,
      action,
    };
  }
  
  const rows = [
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="unknwn_txt">Unknown</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn ethrm_btn">Ethereum</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="yllw_txt">3.337%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="grrn_txt">32.46%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn plgn_btn">Polygon</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="red_txt">15.37%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="unknwn_txt">Unknown</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn plgn_btn">Polygon</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="yllw_txt">3.337%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="grrn_txt">32.46%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn ethrm_btn">Ethereum</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="red_txt">15.37%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="unknwn_txt">Unknown</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn plgn_btn">Polygon</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="yllw_txt">3.337%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="grrn_txt">32.46%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn plgn_btn">Polygon</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="red_txt">15.37%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="yllw_txt">3.337%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn plgn_btn">Polygon</Button>],[<Typography className="pair_info_h4" component="h4">WETH/SOS<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt buy_txt">BUY</span>], '69,398.90117455', '4.00', '$13,612.77', [<Typography className="grrn_txt">32.46%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    createData([<Button className="def_chain_btn bsc_btn">BSC</Button>],[<Typography className="pair_info_h4" component="h4">WETH/FEI<span>0X4A7A90...09C5</span></Typography>], [<Typography component="h4"><span className="whtspce_nwrp">2022-01-06</span> 22:37:00</Typography>], [<span className="type_txt sell_txt">SELL</span>], '920,000,000.00', '7.93', '$27,036.85', [<Typography className="red_txt">15.37%</Typography> ], [<Link to="/" className="maker_txt">0xa89b12...5a1e</Link>], [<Box className="other_td"><Box component="img" src="/img/other_img_01.svg" width="20px" /><Box component="img" src="/img/action_img_05.png" width="20px" /></Box>]),
    
  ];
  
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
    orderBy: Key,
  ): (
    a: { [key in Key]: any | string },
    b: { [key in Key]: any | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
      numeric: true,
      disablePadding: true,
      label: 'PAIR',
    },
    {
      id: 'pair',
      numeric: false,
      disablePadding: true,
      label: 'PAIR',
    },
    {
      id: 'execution_time',
      numeric: false,
      disablePadding: true,
      label: 'EXECUTION TIME',
    },
    {
      id: 'type',
      numeric: true,
      disablePadding: false,
      label: 'TYPE',
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: false,
      label: 'QUANTITY',
    },
    {
      id: 'total_eth',
      numeric: true,
      disablePadding: false,
      label: 'TOTAL ETH',
    },
    {
      id: 'total_usd',
      numeric: true,
      disablePadding: false,
      label: 'TOTAL USD',
    },
    {
      id: 'variation',
      numeric: true,
      disablePadding: false,
      label: 'VARIATION',
    },
    {
      id: 'maker',
      numeric: true,
      disablePadding: false,
      label: 'MAKER',
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'ACTIONS',
    },
   
  ];
  
  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
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
                  <Box component="span">
                    {order === 'desc' ? '' : ''}
                  </Box>
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
export default function BigSwapTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('type');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.pair);
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
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <>
        <Box className='main_tb_box dfrnt_slct'>
            <Grid container spacing={2}>
                <Grid item xs={12} xl={6}>
                    <Box className='tradin_h5 for_flex_box'>
                        <Typography component='h4'variant="h5">Big Trades Explorer</Typography> 
                          <Typography>Shows latest big swaps in Ethereum with useful information</Typography>   
                    </Box>
                </Grid>
                <Grid item xs={12} lg={1}>
                    <Box className="lft_slct_box">
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                                <MenuItem value={10}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                                <MenuItem value={20}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                                <MenuItem value={30}><img src="/img/bnb.svg" width="18" />Binance</MenuItem>
                            
                            </Select>
                            {/* <FormHelperText>Without label</FormHelperText> */}
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} xl={5}>
                  <Box className='search_bx'>
                      <Search>
                          <SearchIconWrapper>
                          <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                          placeholder='Enter a USD amount higher than 10000'
                          inputProps={{ 'aria-label': 'search' }}
                          />
                      </Search>
                  </Box>
                  {/* <Box className="search_bx two_search_box">
                    <Search className="first_search_bar">
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Find by symbol, name, token contract, pair address or maker"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                    <Search className="second_search_bar">
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Enter a USD amount higher than 10000"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                  </Box> */}
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
                        <Box sx={{ width: '100%' }} className="deftbl big_swap_tb">
                          <TableContainer>
                              <Table
                                  sx={{ minWidth: 750 }}
                                  aria-labelledby="tableTitle"
                              >
                                  <EnhancedTableHead
                                  numSelected={selected.length}
                                  order={order}
                                  orderBy={orderBy}
                                  onSelectAllClick={handleSelectAllClick}
                                  onRequestSort={handleRequestSort}
                                  rowCount={rows.length}
                                  />
                                  <TableBody>
                                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                  rows.slice().sort(getComparator(order, orderBy)) */}
                                  {stableSort(rows, getComparator(order, orderBy))
                                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                      .map((row, index) => {
                                      const isItemSelected = isSelected(row.chain);
                                      const labelId = `enhanced-table-checkbox-${index}`;

                                      return (
                                          <TableRow
                                          hover
                                          onClick={(event) => handleClick(event, row.chain)}
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.chain}
                                          selected={isItemSelected}
                                          >
                                      
                                          <TableCell
                                              component="th"
                                              id={labelId}
                                              scope="row"
                                              padding="none"
                                          >
                                              {row.chain}
                                          </TableCell>
                                          <TableCell>{row.pair}</TableCell>
                                          <TableCell>{row.execution_time}</TableCell>
                                          <TableCell>{row.type}</TableCell>
                                          <TableCell>{row.quantity}</TableCell>
                                          <TableCell>{row.total_eth}</TableCell>
                                          <TableCell>{row.total_usd}</TableCell>
                                          <TableCell>{row.variation}</TableCell>
                                          <TableCell>{row.maker}</TableCell>
                                          <TableCell>{row.action}</TableCell>
                                          </TableRow>
                                      );
                                      })}
                              
                                  </TableBody>
                              </Table>
                            </TableContainer>
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={rows.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              className="tblpgntn"
                            />
                    
                    </Box>
                </Grid>
            </Grid>
          
        </Box>
          
        </>
    )
}
