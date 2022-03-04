import { Card, CardHeader, CardContent, Container, Grid, Typography, Divider } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Header from "../Components/User_Interface/Header";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase/firebase-config";
import * as moment from 'moment';
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, connectHits} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  "SBRLXSRY2E",
  "a1e512ec0c3a078a27cda5a5b8fbc073",
);
console.log(Hits)



const results = (props) => {
  const {hits, purchasedServices, setPurchasedServices} = props
    console.log("hits", hits)
    console.log("Purchased Services", purchasedServices)

    // const servicesArray = 

    const purchasedServicesSearch = purchasedServices.filter((service) => {
    return hits.some((hit) => {
           return service.DOC_ID === hit.objectID
    });
  });
  
  // update purchasedServices to show purchasedServices that match the algolia search
  console.log("Searched Services",purchasedServicesSearch)

  return (
    <>
    <Grid
      spacing={2}
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      {purchasedServicesSearch.map((purchasedService) => {
      return (
      <Grid item>
        <Card xs={6}>
          <CardHeader
            sx={{fontWeight: 'bold'}}
            avatar={
                <Avatar alt="" src={purchasedService?.company_logo}>
                    </Avatar>
            }
            // sx={{fontWeight: 'bold'}} 
            title ={purchasedService?.company_name}
            subheader= {moment(purchasedService?.end_time).format('MMMM Do YYYY')}
          />
          <Divider/>
          <CardContent>
          <Typography variant='body2'>
                  <strong>Service:</strong> {purchasedService?.title}
              </Typography>
              <Typography variant='body2'>
                  <strong>Start Time:</strong> {moment(purchasedService?.start_time).format('LTS')}
              </Typography>
              <Typography variant='body2'>
                  <strong>End Time:</strong> {moment(purchasedService?.end_time).format('LTS')}
              </Typography>
              </CardContent>
        </Card>
      </Grid>
      )})}
    </Grid>
 </>
  // <ol>
  //   {hits.map(hit => (
  //     <li key={hit.objectID}>{hit.Service}</li>
  //   ))}
  // </ol>
)};

const CustomHits = connectHits(results);

// const AppointmentHits = (props) => {
  
//   return(
//      <>
//      <div>

//        <p>Event Title:{hit.Service}</p>
//      </div>
//      </>
//   )
// }

const AppointmentHistory = (props) => {
 
  console.log(props)
  const [purchasedServices, setPurchasedServices] = useState([]);

  console.log(purchasedServices);

  const { currentUser } = useAuth();
 

  useEffect(() => {
    let collectionRef = collection(db, "events");
    if (currentUser?.uid) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser?.uid),
      where("paid", "==", "Yes"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let purchasedServicesData = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setPurchasedServices(purchasedServicesData);
        }
      });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <>
      <Header />
      <InstantSearch indexName={'dev_EVENTS'} searchClient={searchClient}>
        
      <Container>
        <Grid direction="row" container justifyContent="center">
          <Grid item>
           <SearchBox />
           <CustomHits purchasedServices={purchasedServices} setPurchasedServices={setPurchasedServices} />
           </Grid>
           </Grid>
      </Container>
      </InstantSearch>
      </>
  );
};

export default AppointmentHistory;
