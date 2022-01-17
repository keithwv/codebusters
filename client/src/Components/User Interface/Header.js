import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
