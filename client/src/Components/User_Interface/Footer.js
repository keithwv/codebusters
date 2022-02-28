import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Grid, Container, Divider } from "@mui/material";
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
        styles={{
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
            whiteSpace: "nowrap",
          },
        }}
      />
      <Divider sx={{ pt: 16 }} />

      <Box
        sx={{
          bgcolor: "background.paper",
          pr: 10,
          pl: "296px",
          pb: 4,
        }}
        component="footer"
      >
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            pt: 4,
            pb: 10,
          }}
        >
          <Grid
            sx={{ minWidth: "100%" }}
            container
            spacing={4}
            justifyContent="space-evenly"
          >
            {footers.map((footer) => (
              <Grid
                // noWrap={true}
                item
                xs={12}
                sm={6}
                md={3}
                key={footer.title}
                sx={{ minWidth: "25%" }}
              >
                <Typography
                  // noWrap={true}
                  variant="h6"
                  color="text.primary"
                  gutterBottom
                >
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
        <Copyright />
      </Box>
    </React.Fragment>
  );
};

export default Footer;
