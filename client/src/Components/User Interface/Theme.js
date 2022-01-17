 import  { createTheme } from '@mui/material/styles';

 const arcBlue = "#0b72b9";
 const arcOrange = "#00897b";
 

 const theme = createTheme({
     palette: {
         common:{
             blue: `${arcBlue}`,
             orange: `${arcOrange}`
         },
         primary: {
             main: `${arcBlue}`
         },
         secondary: {
             main: `${arcOrange}`
         }

     }
 });

 export default theme;