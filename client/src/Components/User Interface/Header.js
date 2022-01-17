import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from '@mui/material/useScrollTrigger';


function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const Header = (props) => {
  return (
  <ElevationScroll>
    <AppBar position="fixed" color='primary'>
      <Toolbar>Book Me!</Toolbar>
    </AppBar>
  </ElevationScroll>
  );
};

export default Header;