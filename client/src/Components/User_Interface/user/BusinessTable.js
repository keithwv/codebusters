import React, { forwardRef, useState } from "react";
import MaterialTable from "@material-table/core";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
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
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import cards from "../../HomePageCards/cards";


const deleteBusiness = (id) => {
  const businessDoc = doc(db, "business", id);
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
  const businessDoc = doc(db, "business", id);
  await updateDoc(businessDoc, {
    ...newData,
  });

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

export default function BusinessTable(props) {
  const { businessInfo } = props; // all business information from logged in user fetched from the business collection of firestore

  const { currentUser } = useAuth();


  const [columns, setColumns] = useState([
    {
      title: "Company Logo",
      field: "imageUrl",
      render: (rowData) => (
        <Avatar
          src={rowData.imageUrl}
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Company Name",
      field: "company_name",
      width: "20%",
      cellStyle: {
        width: 100,
        minWidth: 100,
      },
    },
    // {
    //   title: "Address 1",
    //   field: "address1",
    //   cellStyle: {
    //     width: 100,
    //     minWidth: 100,
    //   },
    // },
    // {
    //   title: "Address 2",
    //   field: "address2",
    //   cellStyle: {
    //     width: 100,
    //     minWidth: 100,
    //   },
    // },
    {
      title: "City",
      field: "city",
      cellStyle: {
        width: 100,
        minWidth: 100,
      },
    },
    {
      title: "Postal Code",
      field: "postal_code",
      width: "20%",
      cellStyle: {
        width: 50,
        minWidth: 50,
      },
    },
    {
      title: "Province",
      field: "province",
      width: "20%",
      cellStyle: {
        width: 50,
        minWidth: 50,
      },
    },
    {
      title: "Category",
      field: "category",
      width: "20%",
      cellStyle: {
        width: 100,
        minWidth: 100,
      },
      editComponent: ({onChange}) => (
        <Select
          id="category-menu"
          labelId="category-menu-id"
          value={cards.title}
          defaultValue= ""
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
  
    const newDocRef = doc(collection(db, "business"));
    // console.log(newDocument, 'newDoc here!!!')
    try {
      await setDoc(newDocRef,  {
        address1: newData.address1 || null,
        address2: newData.address2 || null,
        city: newData.city,
        company_name: newData.company_name,
        postal_code: newData.postal_code,
        province: newData.province,
        category: newData.category,
        DOC_ID: newDocRef.id,
        uid: currentUser.uid,
      });
      console.log("Business Submitted");
    } catch (error) {
      console.log(error);
    }
    console.log(newData);
    resolve();
  };

  return (
    <div>
      <MaterialTable
        title="Business Information"
        data={businessInfo}
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
    </div>
  );
}
