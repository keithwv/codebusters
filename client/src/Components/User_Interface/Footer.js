import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Grid, Container } from "@mui/material";
import { GlobalStyles } from "@mui/styled-engine";

//add proper info to this block for deployement
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://book.me">
        book.me
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: ["Cool stuff", "Team feature", "Developer stuff"],
  },
  {
    title: "Resources",
    description: ["Base resources", "Final resource", "Site map"],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use", "Payment info"],
  },
];

const Footer = () => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />

      <Box sx={{ bgcolor: "background.paper", p: 10 }} component="footer">
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
          }}
        >
          <Grid
            container
            spacing={4}
            justifyContent="space-evenly"

            // height={'10px'}
          >
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li style={{ margin: 0 }} key={item}>
                      <Link href="#" variant="subtitle1" color="text.secondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </Box>
    </React.Fragment>
  );
};

export default Footer;
