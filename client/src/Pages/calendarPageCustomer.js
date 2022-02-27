import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list'
import { useAuth } from "../contexts/AuthContext";
import { collection,onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import "../Components/Schedule/calendar.css";
import BookingModal from "../Components/Modals/BookingModal"
import Header from "../Components/User_Interface/Header";
import { useLocation } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";


export default function CalendarWithScheduleCustomer() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let myBusiness_ID = params.get("Business_ID");
  let service = params.get("service")

  // Set business hours
  const businessHours = {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5, 6],

    startTime: "09:00",
    endTime: "17:00",
  };

  const { currentUser } = useAuth(); // currentUser refers to authenticated user
  // All State declarations below

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [eventsData, setEventsData] = useState([]); // Used when fetching the current events stored in firestore for a unique user
  const [servicesProvided, setServicesProvided] = useState([])
  const [bookEvents, setBookEvents] = useState({
    check: false,
    data: ""
  })

  // Extract the company logo and place it on the sidebar
  let company_logo=servicesProvided[0]?.company_logo
  
  const [user, setUser] = useState(null)



  // Get customer information from users database of firestore to and use this information
  // to prepopulate contact informaion on Booking Form modal
  useEffect(() => {
    if (currentUser?.uid) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setUser({
            name: usersData[0].name,
            last_name: usersData[0].last_name,
            email: usersData[0].email,
          });
        }
      });
      return unsubscribe;
    }
  }, [currentUser?.uid]);

  

  // Get all services associated with the selected business
  useEffect(() => {
    let collectionRef = collection(db, "services");
    if (myBusiness_ID) {
      let queryRef = query(
        collectionRef,
        where("Business_ID", "==", myBusiness_ID)
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
          console.log(servicesData)
          setServicesProvided(servicesData);
        }
      });
      return unsubscribe;
    }
  }, [myBusiness_ID]);
 

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <Typography color="blue" variant="h7" color="white">
            <strong>SELECTED BUSINESS</strong>
            </Typography> 
        <Avatar alt="" src={company_logo} sx={{ height: 100, width: 100, ml: "2rem", mt: "1rem" , mb:"2rem"}}/>
         <label>
           <b>Instructions:</b> Click on timeslot
           in the calendar or listview
           to book an appointment
         </label>
         <br></br>
         <br></br>
         <label>
          <b>Note:</b> "All" denotes that any
          of the company services are
          offered at this timeslot.
          Please select a service from the
          drop-down menu that appears
          after timeslop is selected
         </label>
        </div>
      </div>
    );
  };


  const method = () => {
    // setAddEvent({ check: false });
    setBookEvents({ check: false, data: "" });
  };

  // Need to be able to delete doc from firebase and the user interface
  const handleEventClick = (clickInfo) => {
    setBookEvents({
      check: true,
      data: clickInfo,
    });
  };

 
  // Initial fetch of all events from database for the selected business and service
  useEffect(() => {
    let collectionRef = collection(db, "events");
    if (myBusiness_ID) {
      let queryRef = query(
        collectionRef,
        where("Business_ID", "==", myBusiness_ID),
        where("status", "==", "Available"),
        where("title", "in", [service,"All"]), // need both selected service and All (all can be any service offered)
      ); // logged in user has unique uid linked to events
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("no docs found");
        } else {
          let eventsData = querySnap.docs.map((doc) => ({
            start: doc.data().start_time,
            end: doc.data().end_time,
            title: doc.data().title,
            id: doc.id,
            backgroundColor: doc.data().color,
            email: doc.data().customer_email,
            status: doc.data().status,
            name: doc.data().customer_name,
            number: doc.data().customer_phone_number,
            notes: doc.data().notes,
            hourly_cost: doc.data().hourly_Cost
          }));
          setEventsData(eventsData);
        }
      });
      return unsubscribe;
    } else {
      console.log("User not logged in");
    }
  }, []); // triggers when new user logins




  
  return (
    <>
    <Header/>
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay, listDay,listWeek,listMonth",
          }}
          views= {{
            listDay: { buttonText: 'List Day' },
            listWeek: { buttonText: 'List Week' },
            listMonth: { buttonText: 'List Month' }
          }}
          initialView="timeGridWeek"
          editable={false}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          businessHours={true}
          events={eventsData}
          weekends={weekendsVisible}
          selectConstraint={businessHours} // ensures user cannot create an event outside of defined business hours
          eventClick={handleEventClick}
          eventOverlap={false}
          slotEventOverlap={false}
  
          // eventDrop={handleEventDrop}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          //eventContent={renderEventContent}
        />
      </div>
      {bookEvents.check && (
        <BookingModal bookEvents={bookEvents} servicesProvided={servicesProvided} user={user} method={method} />
      )}
    </div>
    </>
  );
}
