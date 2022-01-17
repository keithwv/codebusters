import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@material-ui/styles";

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
      marginLeft: 'auto',
  }
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed"  color="primary">
          <Toolbar>
        <Typography variant="h3">Book Me!</Typography>
              <Tabs className={classes.tabContainer} textColor="white">
                  <Tab label="Home"/>
                  <Tab label="Register" />
                  <Tab label="Login" />
                  <Tab label="About Us" />
                  <Tab label="Contact Us" />
              </Tabs>
            
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
