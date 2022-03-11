import React from 'react';
import './assets/css/App.scss';
import { client } from './ApolloClient/index';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './elements/Header';
import Footer from './elements/Footer';
import HomePage from './pages/HomePage';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Sidebar from './elements/Sidebar';
import LiveNewPairs from './pages/LiveNewPairs';
import BigSwapExplorer from './pages/BigSwapExplorer';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Landing from './pages/Landing';
import DexSwap from './pages/DexSwap';
import WalletTracking from './pages/WalletTracking';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));
const ListItemStyle = styled(ListItem)(({ theme }) => ({
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
}));

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  TimeAgo.addDefaultLocale(en);
  return (
    <div className='App'>
      <BrowserRouter>
        <ApolloProvider client={client}>
          {/* <Header /> */}
          <Box
            sx={{ display: 'flex' }}
            className={
              open ? 'showdrawer sdbrprnt_def' : 'hidedrawer sdbrprnt_def'
            }
          >
            {/* <CssBaseline /> */}
            <AppBar position='fixed' open={open} className='asAppbar'>
              <Toolbar>
                {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Persistent drawer
              </Typography> */}
                <IconButton onClick={handleDrawerClose} className='drwr_btn'>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
                <Link to='/' className='desktop_logo'>
                  <Box component='img' src='/img/logo.svg' alt='' />
                </Link>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant='persistent'
              anchor='left'
              open={open}
              className='sdbrprnt'
            >
              <DrawerHeader></DrawerHeader>
              <Sidebar />
            </Drawer>
            <Main open={open}>
              {/* <Header /> */}
              <DrawerHeader />
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/:network/:pairToken' element={<HomePage />} />

                <Route
                  path='/new-pair/:network/:routerAddress'
                  element={<LiveNewPairs />}
                />
                <Route
                  path='/big-swap-sxplorer'
                  element={<BigSwapExplorer />}
                />

                <Route path='/dexswap' element={<DexSwap />} />
                <Route path='/wallettracking' element={<WalletTracking />} />
              </Routes>
              <Footer />
            </Main>
          </Box>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
