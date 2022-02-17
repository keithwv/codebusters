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
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardActions, TextField } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Header from "../Components/User_Interface/Header";
import cards from "../Components/HomePageCards/cards";
import ListOfBusinessesInCategory from "./list_of_businesses_categories";
// import { SelectedCategoryProvider } from "../contexts/SelectedCategoryContext";

const theme = createTheme();

export default function HomePage() {
  // const [value, setValue] = useState();
  // console.log(value, 'HELLOEEEEHELLOEEEEHELLOEEEEHELLOEEEEHELLOEEEEHELLOEEEE')
  // const handleChange = (e) => {
  //   setValue(cards.title)
  // }
  return (
    <ThemeProvider theme={theme}>
      <Header />

      {/* <ListOfBusinessesInCategory value={value} /> */}

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
                {/* <SelectedCategoryProvider> */}

                {/* <div onClick={handleChange}> */}
                {/* console.log("CLICKED", setValue() ) */}
                <Link
                  // href="/business-category-list"
                  // href={{
                  //   pathname: '/business-category-list',
                  //   query: { name: item.title },
                  // }}
                  // href="/business-category-list"
                  to={{
                    pathname: "/business-category-list",
                    search: item.title,
                    // query: { name: item.title },
                    // hash: "Vehicle Services",
                    // state: { referrer: item.pathname },
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      mr: "240px",
                      maxWidth: "100%",
                    }}
                  >
                    {/* takes path from cards array */}
                    {/* <CardActions */}
                    {/* // component="button" */}
                    {/* // onClick={() => { */}
                    {/* //   setValue(item.title);
                  //   // alert("clicked");
                  //   // console.log(item.title, "status");
                  // }}
                  // > */}
                    {/* <Link href={item.path}> */}
                    <CardActionArea>
                      {/* takes image path from cards array */}
                      <CardMedia component="img" image={item.imageSource} />
                    </CardActionArea>
                    {/* </CardActions> */}
                    <CardContent>
                      {/* takes title from cards array */}
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      {/* takes text from cards array */}
                      <Typography>{item.text}</Typography>
                    </CardContent>
                  </Card>
                </Link>
                {/* </div> */}
                {/* </SelectedCategoryProvider> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
