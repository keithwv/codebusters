import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

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
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    //e.prevent.default()
    setValue(value);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === "/Register" && value !==1) {
      setValue(1)
    } else if (window.location.pathname === "/Login" && value !==2) {
      setValue(2)
    } else if (window.location.pathname === "/AboutUs" && value !==3) {
      setValue(3)
    } else if (window.location.pathname === "/ContactUs" && value !==4) {
      setValue(4)
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h3">Book Me!</Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              textColor="inherit" 
            >
              <Tab className={classes.tab} component={Link} to="/" label="Home" />
              <Tab className={classes.tab} component={Link} to="/Register" label="Register" />
              <Tab className={classes.tab} component={Link} to= "/Login" label="Login" />
              <Tab className={classes.tab} component={Link} to= "/AboutUs" label="About Us" />
              <Tab
                className={classes.tab}
                component={Link}
                to="/ContactUs"
                label="Contact Us"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
