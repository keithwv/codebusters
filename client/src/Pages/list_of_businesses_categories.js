import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";



export default function ListOfBusinessesInCategory() {
    
    const [heroes, setHeroes] = React.useState([]);
    const FirebaseContext = React.useContext(FirebaseContext);
    const db = FirebaseContext.db;
  
    const AddBusinesses = async () => {
      try {
        let collectionRef = collection(db, "business");
        let queryRef = query(collectionRef, orderBy("category"));
        let querySnap = await getDocs(queryRef);
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let heroesData = querySnap.docs.map((doc) => ({
            ...doc.data(),
            DOC_ID: doc.id,
          }));
          setHeroes(heroesData);
        }
      } catch (ex) {
        console.log("FIRESTORE FAILURE!", ex.message);
      }
    };

    // const AddBusinesses = () => {
    //     const list = useContext(FirebaseContext);
    //     const db = list.db;
    //     const [name, setName] = useState('');
    //     const addHero = async (heroName, heroVehicle) => {
    //       try {
    //         let collectionRef = collection(db, 'business');
    //         await addDoc(collectionRef, { name: heroName, vehicle: heroVehicle });
    //         setName('');
    //         setVehicle('');
    //       } catch (ex) {
    //         console.log('FAILED TO LOAD THE LIST', ex.message);
    //       }
    //     }
    // }
//   const FirebaseContext = React.createContext();

//   const FirebaseProvider = (props) => {
//     const children = props.children;
//     const theValues = { app };
//     return (
//       <FirebaseContext.Provider value={theValues}>
//         {children}
//       </FirebaseContext.Provider>
//     );
//   };

  return (
    <><Button
          sx={{ minWidth: "135px", height: "40px" }}
          variant="contained"
      >
          Some button
      </Button><List
          sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              ml: "240px",
          }}
      >
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                      primary="Brunch this weekend?"
                      secondary={<React.Fragment>
                          <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                          >
                              Ali Connors
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>} />
              </ListItem>
              <Divider variant="inset" component="li" />
          </List></>
  );
}