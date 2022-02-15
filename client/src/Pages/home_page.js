import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Header from "../Components/User_Interface/Header";
import cards from "../Components/HomePageCards/cards";

// const cards = [
//   {
//     title: "Vehicle Services",
//     text: " View businesses related to vehicle repairs, tunning and other services. ",
//     imageSource:
//       "http://www.iheartradio.ca/image/policy:1.16181387:1633034858/image/image.jpg?a=16%3A9&w=1000&$p$a$w=28c4cb7",
//     path: "/business-category-list",
//   },
//   {
//     title: "Personal Care",
//     text: " View businesses related to hairdressing, cosmetology, skin & body care.",
//     imageSource: "https://i.ibb.co/JxfD2tS/Webp-net-resizeimage.jpg",
//     path: "/business-category-list",
//   },
//   {
//     title: "Indoor Services/Repairs",
//     text: " View repair, construction, cleaning etc. services for homes and offices.",
//     imageSource: "https://i.ibb.co/s5p4GFN/pexels-anete-lusina-4792521.jpg",
//     path: "/business-category-list",
//   },
//   {
//     title: "Outdoor Services/Repairs",
//     text: " View repair, construction, cleaning etc. services for homes and offices.",
//     imageSource: "https://i.ibb.co/s5p4GFN/pexels-anete-lusina-4792521.jpg",
//     path: "/business-category-list",
//   },
//   {
//     title: "Online Services",
//     text: " View repair, construction, cleaning etc. services for homes and offices.",
//     imageSource: "https://i.ibb.co/s5p4GFN/pexels-anete-lusina-4792521.jpg",
//     path: "/business-category-list",
//   },
//   {
//     title: "Other",
//     text: " View repair, construction, cleaning etc. services for homes and offices.",
//     imageSource: "https://i.ibb.co/s5p4GFN/pexels-anete-lusina-4792521.jpg",
//     path: "/business-category-list",
//   },
// ];

const theme = createTheme();

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <CssBaseline />
      <main>
        {/* Search bar component */}
        <Box
          sx={{
            ml: "240px",
            mr: "240px",
            maxWidth: "100%",
            minWidth: "25%",
          }}
        >
          <TextField fullWidth label="Search..." />
        </Box>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 8,
            ml: "240px",
            mr: "240px",
            maxWidth: "100%",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              HOME PAGE
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Some Text/Description
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                sx={{ minWidth: "135px", height: "40px" }}
                variant="contained"
              >
                Some button
              </Button>
              <Button
                sx={{ minWidth: "135px", height: "40px" }}
                variant="outlined"
              >
                Another button
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((item, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    mr: "240px",
                    maxWidth: "100%",
                  }}
                >
                  {/* takes path from cards array */}
                  <Link href={item.path}>
                    <CardActionArea>
                      {/* takes image path from cards array */}
                      <CardMedia component="img" image={item.imageSource} />
                    </CardActionArea>
                  </Link>
                  <CardContent>
                    {/* takes title from cards array */}
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    {/* takes text from cards array */}
                    <Typography>{item.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
