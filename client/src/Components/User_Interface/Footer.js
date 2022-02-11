import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Divider } from '@mui/material';

//add proper info to this block after deployement
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://bookMe.com">
        bookMe.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    
    <Box
      sx={{ bgcolor: 'background.paper', p: 10 }}
      component="footer"
    >
       <Divider sx={{mr:"15%", ml:"15%"}}/>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
      >
        Footer will always be at the bottom, so add components with confidence!
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
      <Copyright />
    </Box>
  )
}

export default Footer;
