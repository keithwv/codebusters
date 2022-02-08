import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
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
  LocalConvenienceStoreOutlined,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import { useAuth } from "../../../contexts/AuthContext";

const columns = [
  {
    title: "Company Name",
    field: "company_name",
    width: '20%',
    cellStyle: {
        width: 100,
        minWidth: 100
  }
  },
  {
    title: "Address 1",
    field: "address1",
    cellStyle: {
        width: 150,
        minWidth: 150
  }
},
  {
    title: "Address 2",
    field: "address2",
    cellStyle: {
        width: 100,
        minWidth: 100
  }
},
  {
    title: "City",
    field: "city",
    cellStyle: {
        width: 100,
        minWidth: 100
  }
  },
  {
    title: "Postal Code",
    field: "postal_code",
    width: '20%',
    cellStyle: {
        width: 100,
        minWidth: 100
  }
    
  },
  {
    title: "Province",
    field: "province",
    width: '20%',
    cellStyle: {
        width: 100,
        minWidth: 100
  }
  },
];

const deleteBusiness = (id) => {
  const businessDoc = doc(db, "business", id);
  return deleteDoc(businessDoc);
};
const handleRowAdd = async (props,newData, resolve) => {
    const {currentUser} = props
    console.log(currentUser)
  if (currentUser?.uid) {
  try {
    await addDoc(collection(db, "business"), {
      address1: newData.address1,
      address2: newData.address2,
      city: newData.city,
      company_name: newData.company_name,
      postal_code: newData.postal_code,
      uid: currentUser.uid
    });
    console.log("Business Submitted");
  } catch (error) {
    console.log(error);
  }
  console.log(newData);

}};

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

export default function BusinessTable() {
  const [rows, setRows] = useState([]);
  console.log(rows);

  const { currentUser } = useAuth();
  console.log(currentUser)

  const handleRowAdd = async (newData, resolve) => {
   console.log(newData)

  try {
    await addDoc(collection(db, "business"), {
      address1: newData.address1,
      address2: newData.address2,
      city: newData.city,
      company_name: newData.company_name,
      postal_code: newData.postal_code,
      province: newData.province,
      uid: currentUser.uid
    });
    console.log("Business Submitted");
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
          setRows(businessData);
          
        }
      });
      return unsubscribe;
     }
  }, [currentUser.uid]);

  return (
    <div>
      <MaterialTable
        title="Business Information"
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
    </div>
  );
}
