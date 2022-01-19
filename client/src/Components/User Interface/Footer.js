import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import { Toolbar } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
  },
  mainContainer: {
    position: "absolute",
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      {/* <footer className={classes.footer}> */}
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <Grid container justifyContent='center' className={classes.mainContainer} >
              <Grid item>
                <Grid container direction="column">
                  <Grid item className={classes.link} > 
                     Home
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      {/* </footer> */}
    </>
  );
};
export default Footer;
