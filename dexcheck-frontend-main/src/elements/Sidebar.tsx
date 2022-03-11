import React from 'react'
import {Box} from '@mui/material';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function Sidebar() {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const [opentwo, setOpentwo] = React.useState(false);
    const handleClicktwo = () => {
        setOpentwo(!opentwo);
    };
    const [openthree, setOpenthree] = React.useState(false);
    const handleClickthree = () => {
        setOpenthree(!openthree);
    };
    const [openfour, setOpenfour] = React.useState(false);
    const handleClickfour = () => {
        setOpenfour(!openfour);
    };
    const [openfive, setOpenfive] = React.useState(false);
    const handleClickfive = () => {
        setOpenfive(!openfive);
    };
    const [opensix, setOpensix] = React.useState(false);
    const handleClicksix = () => {
        setOpensix(!opensix);
    };
    const [openseven, setOpenseven] = React.useState(false);
    const handleClickseven = () => {
        setOpenseven(!openseven);
    };

    ///
    const [isActive, setActive] = React.useState(true);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    return (
        <>
            <Link to="/" className="sdbrlg"><Box component="img" src="/img/logo.svg" alt="" /></Link>
            <Box className="sdbr_lnks">
                <ul className="sdbrnv">
                    <li>
                        <Link to="/" className={splitLocation[1] === "" ? "active" : ""}>
                            <Box component="img" src="/img/sidebar_ic_01.png" alt="" />
                            CheckBoard
                        </Link>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClick} className={splitLocation[1] === "/chart" ? "active" : ""}>
                            <Box component="img" src="/img/sidebar_ic_02.png" alt="" />
                            DexSwap
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/dexswap">DexSwap</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClicktwo}>
                            <Box component="img" src="/img/sidebar_ic_03.png" alt="" />
                            Charts
                            {opentwo ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={opentwo} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/:network/:pairToken">Charts</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClickthree}>
                            <Box component="img" src="/img/sidebar_ic_04.png" alt="" />
                            New Pairs
                            {openthree ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={openthree} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/new-pair/:network/:routerAddress">New Pairs</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClickfour}>
                            <Box component="img" src="/img/sidebar_ic_05.png" alt="" />
                            Big Trades
                            {openfour ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={openfour} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/big-swap-sxplorer">Big Trages</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClickfive}>
                            <Box component="img" src="/img/sidebar_ic_06.png" alt="" />
                            Wallet Tracking
                            {openfive ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={openfive} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/wallettracking">Wallet Tracking</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClicksix}>
                            <Box component="img" src="/img/sidebar_ic_07.png" alt="" />
                            DexTax
                            {opensix ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={opensix} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    <li className='mltitms'>
                        <a onClick={handleClickseven}>
                            <Box component="img" src="/img/sidebar_ic_08.png" alt="" />
                            DexBot
                            {openseven ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={openseven} timeout="auto" unmountOnExit>
                            <Box className="inner_links">
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                                <Link to="/">Link Here</Link>
                            </Box>
                        </Collapse>
                    </li>
                    {/* <li>
                        <Link to="/live-new-pairs" className={splitLocation[1] === "live-new-pairs" ? "active" : ""}>
                            <Box component="img" src="/img/livenewpairs_ic.svg" alt="" />
                            Live New Pairs
                        </Link>
                    </li>
                    <li>
                        <Link to="/big-swap-sxplorer" className={splitLocation[1] === "big-swap-sxplorer" ? "active" : ""}>
                            <Box component="img" src="/img/bigswapexplorer_ic.svg" alt="" />
                            Big Swap Explorer
                        </Link>
                    </li> */}
                </ul>
                <Box sx={{ flexGrow: 1 }} />
                <ul className="sdbrnv sdbrnv_lst">
                    {/* <li>
                        <Link to="/">
                            <Box component="img" src="/img/Stats_icon.svg" alt="" />
                            Stats
                        </Link>
                    </li> */}
                    <li>
                         <Link to="/">
                            <Box component="img" src="/img/UserAccount_icon.svg" alt="" />
                            User Account
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <Box component="img" src="/img/Configuration_icon.svg" alt="" />
                            Configuration
                        </Link>
                    </li>
                </ul>
            </Box>
            
        </>
    )
}
