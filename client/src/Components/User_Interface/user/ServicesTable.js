import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "@material-table/core";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase-config";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  ClearAll,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";

const columns = [
  {
    title: "Service",
    field: "service",
  },
  {
    title: "Cost per Hour ($)",
    field: "hourly_Cost",
},
{
    title: "Business",
    field: "business",
}
];

const deleteBusiness = (id) => {
  const businessDoc = doc(db, "services", id);
  return deleteDoc(businessDoc);
};
const handleRowAdd = async (props, newData, resolve) => {
    const {currentUser} = props
    console.log(currentUser)
  if (currentUser?.uid) {
  try {
    await addDoc(collection(db, "services"), {
      service: newData.service,
      hourly_Cost: newData.hourly_Cost,
      uid: currentUser.uid
    });
    console.log("Service Submitted");
  } catch (error) {
    console.log(error);
  }
  console.log(newData);

}
  resolve();
};

const handleRowDelete = async (oldData, resolve) => {
  const id = oldData.DOC_ID;
  deleteBusiness(id);
  resolve();
};

const handleRowUpdate = async (newData, oldData, resolve) => {
  console.log(newData);
  console.log(oldData);
  const id = newData.DOC_ID;
  const serviceDoc = doc(db, "services", id);
  console.log(serviceDoc)
  try {
  await updateDoc(serviceDoc, {
    ...newData,
  }); 
  console.log('Doc Updated')
} catch(err) {
  console.log(err.message)
}

  resolve();
};

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  ClearAll: forwardRef((props, ref) => <ClearAll {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function ServicesTable() {
  const [rows, setRows] = useState([]);
  console.log(rows)
  const [business, setBusiness] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  
  console.log(selectedBusiness.DOC_ID)
  const { currentUser } = useAuth();
  console.log(currentUser)

  const handleChange = (event) => {
    setSelectedBusiness(event.target.value)
  }

  const handleRowAdd = async (newData, resolve) => {
   console.log(newData)
   
  try {
    await addDoc(collection(db, "services"), {
      service: newData.service,
      hourly_Cost: newData.hourly_Cost,
      business: selectedBusiness.company_name,
      uid: currentUser.uid,
      DOC_ID: selectedBusiness.DOC_ID

    });
    console.log("Service Submitted");
  } catch (error) {
    console.log(error);
  }
  console.log(newData);
  resolve()

};



useEffect(() => {
  let collectionRef = collection(db, "business");
   if (currentUser?.uid) {
    let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let businessData = querySnap.docs.map((doc) => {
          return {
            ...doc.data(),
            DOC_ID: doc.id,
          };
        });
        setBusiness(businessData);
        
      }
    });
    return unsubscribe;
   }
}, [currentUser.uid]);


  useEffect(() => {
    let collectionRef = collection(db, "services");
     if (currentUser?.uid && selectedBusiness?.DOC_ID) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid),
      where("DOC_ID", "==", selectedBusiness.DOC_ID ));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let servicesData = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setRows(servicesData);
          
        }
      });
      return unsubscribe;
     }
  }, [currentUser.uid, selectedBusiness.DOC_ID]);

  return (
    <>
         <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl fullwidth="true">
              <InputLabel id="business-menu-id">Business</InputLabel>
            <Select
              id="business-menu"
              labelId="business-menu-id"
              value={selectedBusiness}
              label="Business"
              onChange={handleChange}
            >
            {business.map((business) => {
              return (
                <MenuItem key={business.DOC_ID} value={business}>
                  {business.company_name}
                </MenuItem>
              );
            })}
            </Select>
          </FormControl>
            </Grid>
      <Grid item>
      <MaterialTable
        title="Services Provided"
        data={rows}
        user={currentUser}
        columns={columns}
        icons={tableIcons}
        //options={{selection:true}}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
      />
      </Grid>
      </Grid>
    </>
  );
}
