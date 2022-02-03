import React from 'react';
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import TodayIcon from '@mui/icons-material/Today';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWdith: 10,
    marginLeft: "25px",
  },
}));

const Header = (props) => {
  // Drawer Constants
  let theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Header constants
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    //e.prevent.default()
    setValue(value);
  };

  const { logout } = useAuth();

  const signOut = () => {
    console.log(logout)
    logout()
    //alert("you loggged out");
  };

  useEffect(() => {
    if (window.location.pathname === "/home" && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === "/Register" && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === "/Login" && value !== 2) {
      setValue(2)
    } else if (window.location.pathname === "/Logout" && value !== 3) {
      setValue(3)
    }
    else if (window.location.pathname === "/AboutUs" && value !== 4) {
      setValue(4)
    } else if (window.location.pathname === "/ContactUs" && value !== 4) {
      setValue(5)
    }
  }, [value]);

  const iconsInDrawer = [
    {
      'text': 'Dashboard',
      'iconName': <DashboardIcon />,
      'path': "/dashboard"
    },
    {
      'text': 'Calendar/Schedule',
      'iconName': <TodayIcon />,
      'path': "/calendar"
    },
    {
      'text': 'Your Services',
      'iconName': <HomeRepairServiceIcon />,
      'path': "/services"
    },
  ]
  //  {'Calendar/Schedule', 'Your Services'}]


  return (
    <>
      <div className={classes.toolbarMargin} />
      <ElevationScroll>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h3">Book Me!</Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
                textColor="inherit"
              >
                <Tab className={classes.tab} component={Link} to="/home" label="Home" />
                <Tab className={classes.tab} component={Link} to="/Register" label="Register" />
                <Tab className={classes.tab} component={Link} to="/Login" label="Login" />
                <Tab className={classes.tab} component={Link} to="/Login" label="Logout" onClick={signOut} />
                <Tab className={classes.tab} component={Link} to="/services" label="Services" />
                <Tab className={classes.tab} component={Link} to="/add-services" label="Add Services" />
              </Tabs>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {iconsInDrawer.map((item) => (
                <ListItem button component={Link} to={item.path} key={item.text}>
                  {/* <ListItem button component={Link} to="/dashboard" key={text}> */}

                  <ListItemIcon>
                    {item.iconName}
                    {/* <DashboardIcon index={"Dashboard"} />
                    <TodayIcon index={"Calendar/Schedule"} />
                    <HomeRepairServiceIcon index={"Your Services"} /> */}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Settings'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 1 === 0 ? < MiscellaneousServicesIcon /> : <MiscellaneousServicesIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <DrawerHeader />
        </Box>
      </ElevationScroll>
    </>
  );
};

export default Header;
