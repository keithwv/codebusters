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
import DashboardIcon from '@mui/icons-material/Dashboard';
import TodayIcon from '@mui/icons-material/Today';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BusinessAvatar from './business/business_avatar';
import { Avatar } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from "../../Firebase/firebase-config";


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

  const { currentUser } = useAuth()

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

  const drawerElements = [
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
    {
      'text': 'Add/Update Business',
      'iconName': <AddBusinessIcon />,
      'path': "/profile"
    },
  ]

  const businessProfileDrawerElement = [
    {
      'text': 'Your Profile',
      'path': "/business-profile"
    },
  ]

  // Get User from the users database
  const [users, setUsers] = useState([])
   
  
// Get the user information of the users database for current logged in user
  useEffect(() => {
      if (currentUser?.uid) {
      let collectionRef=collection(db, 'users')
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
          if (querySnap.empty) {
              console.log('No docs found')
          } else {
              let usersData = querySnap.docs.map((doc) => {
                  return { ...doc.data(), DOC_ID: doc.id}
              });
              setUsers(usersData)
          }
      });
      return unsubscribe;
    }}, [currentUser?.uid]);
  
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
              <Typography variant="h3">bookMe!</Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
                textColor="inherit"
              >
                <Tab className={classes.tab} component={Link} to="/home" label="Home" />
                {currentUser && <Tab className={classes.tab} component={Link} to="/home" label="Logout" onClick={signOut} />}
                {!currentUser && <Tab className={classes.tab} component={Link} to="/Register" label="Register" />}
                {!currentUser && <Tab className={classes.tab} component={Link} to="/Login" label="Login" />}
                {currentUser && <Avatar alt="code-busters" src={users[0]?.imageUrl}/>}
              </Tabs>
            </Toolbar>
          </AppBar>
          {/* Drawer below */}
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>

              {currentUser && <Avatar style={
                {
                  display: 'flex',
                  justifyContent: 'auto',
                  marginRight: 'auto',
                }
              } >
                {BusinessAvatar()}
              </Avatar>
              }

              {businessProfileDrawerElement.map((item, key) => (
                <ListItem button component={Link} to={item.path} key={item.text}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
              {drawerElements.map((item, key) => (
                <ListItem button component={Link} to={item.path} key={item.text}>
                  <ListItemIcon>
                    {item.iconName}
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
}

export default Header;
