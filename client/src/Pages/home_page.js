import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RrdLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, TextField } from "@mui/material";
import { CardActionArea, Paper } from "@mui/material";
import Header from "../Components/User_Interface/Header";
import cards from "../Components/HomePageCards/cards";

const theme = createTheme();

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <main>
        {/* Logo */}
        <Divider />
        <Paper
          align="center"
          variant="none"
          sx={{
            display: "block",
            ml: "auto",
            mr: "auto",
          }}
        >
          <img src="https://i.ibb.co/LgFkyH5/Webp-net-resizeimage.png" />
        </Paper>

        <Divider />

        {/* Search bar component: */}
        <Box
          sx={{
            position: "relative",
            width: "45%",
            m: "auto",
            mr: "27.5%",
            ml: "27.5%",
            pt: 6,
          }}
        >
          <TextField fullWidth label="Search..." />
        </Box>
        {/* Title: */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 8,
            m: "auto",
            minWidth: "550px",
          }}
        >
          <Container maxWidth="100%">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              BROWSE CATEGORIES
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((item, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    m: "auto",
                    // ml: 8,
                  }}
                >
                  {/* takes path from cards array */}
                  <RrdLink
                    to={`/business-category-list?category=${item.title}`}
                  >
                    <CardActionArea>
                      {/* takes image path from cards array */}
                      <CardMedia component="img" image={item.imageSource} />
                    </CardActionArea>
                  </RrdLink>
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
