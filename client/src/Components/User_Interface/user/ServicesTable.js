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
import { Grid, Container } from "@material-ui/core";
import { MenuItem, Select } from "@mui/material";
import cards from "../../HomePageCards/cards";

const deleteBusiness = (id) => {
  const businessDoc = doc(db, "services", id);
  return deleteDoc(businessDoc);
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
  console.log(serviceDoc);
  try {
    await updateDoc(serviceDoc, {
      ...newData,
    });
    console.log("Doc Updated");
  } catch (err) {
    console.log(err.message);
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

export default function ServicesTable(props) {
  const { selectedBusiness } = props;
  const [rows, setRows] = useState([]);
  // console.log(rows);
  const { currentUser } = useAuth();
  // console.log(currentUser);
  const truncate = (input) =>
  input?.length > 10 ? `${input.substring(0, 10)}...` : input

  let company_logo = selectedBusiness.imageUrl;


  const [columns] = useState([
    {
      title: "Service",
      field: "service",
      width: "25%",
      validate: (rowsData) =>
        rowsData.service === "" ? "service cannot be empty" : true,
    },
    {
      title: "Cost per Hour ($)",
      field: "hourly_Cost",
      width: "25%",
      type: "numeric",
    },
    {
      title: "Description",
      field: "description",
      width: "5%",
      render: rawData => {
        return truncate(rawData.description)
      }
    },
    {
      title: "Category",
      field: "category",
      width: "25%",
      editComponent: ({ onChange }) => (
        <Select
          id="category-menu"
          labelId="category-menu-id"
          value={cards.title}
          defaultValue=""
          label="category"
          onChange={(event) => onChange(event.target.value)}
        >
          {cards.map((card) => {
            return (
              <MenuItem key={card.id} value={card.title}>
                {card.title}
              </MenuItem>
            );
          })}
        </Select>
      ),
    },
  ]);
  const handleRowAdd = async (newData, resolve) => {
    console.log(newData);

    try {
      await addDoc(collection(db, "services"), {
        service: newData.service,
        hourly_Cost: newData.hourly_Cost,
        business: selectedBusiness.company_name,
        uid: currentUser.uid,
        Business_ID: selectedBusiness.DOC_ID,
        category: newData.category,
        company_logo: company_logo || null,
        description: newData.description,
      });
      console.log("Service Submitted");
    } catch (error) {
      console.log(error);
    }
    console.log(newData);
    resolve();
  };

  useEffect(() => {
    let collectionRef = collection(db, "services");
    if (currentUser?.uid && selectedBusiness?.DOC_ID) {
      let queryRef = query(
        collectionRef,
        where("uid", "==", currentUser.uid),
        where("Business_ID", "==", selectedBusiness.DOC_ID)
      );
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
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={8} item>
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
      </Container>
    </>
  );
}
