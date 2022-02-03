import React, { useEffect, useState } from "react";
import FullCalendar, { constrainPoint, formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./calendarUtilities";
import { useAuth } from "../../contexts/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase-config";
import CalendarForm from "./calendarform";
import "./calendar.css";
import { async } from "@firebase/util";
import CalendarModal from "../Modals/CalendarModal";

export default function CalendarWithSchedule() {
  const { currentUser } = useAuth();

  const [currentEvents, setCurrentEvents] = useState([]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [eventsData, setEventsData] = useState([]); // Used when fetching the current events stored in firestore for a unique user
  const [openmodal, setOpenModal] = useState({
    check: false,
    data: ""
  })
  console.log(openmodal.check)

 

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const method = () => {
    setOpenModal({ check: false })
    console.log("Setting check false")
  }


  const handleDateSelect = (selectInfo) => {
    setOpenModal({
      check: true,
      data: selectInfo
    })
    
  }

  
  useEffect(() => {
    let collectionRef = collection(db, "events");
    if(currentUser?.uid) {
    let queryRef =  query(collectionRef, where("uid", "==", currentUser.uid))
    console.log(currentUser.uid)
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("no docs found");
      } else {
        let eventsData = querySnap.docs.map((doc) => ({
          start: doc.data().start_time,
          end: doc.data().end_time,
          title: doc.data().title,
          id: doc.id,
        }));
        setEventsData(eventsData);
      }
    });
    return unsubscribe;
  }else {
    console.log("User not logged in")
  }}, [currentUser.uid]);





  // Function for query a selected document the corresponds with event that has been clicked on the calendar after it has been created
  // Can be used for getting document to either delete or update
  const getselectedDoc = async (clickInfo) => {
    try {
      let collectionRef = collection(db, "events");
      let queryRef = query(
        collectionRef,
        where("start_time", "==", clickInfo.event.startStr),
        where("uid", "==", currentUser.uid) //clickInfo.event.startStr denotes start time which should be unique
      );
      let querySnap = await getDocs(queryRef);
      if (querySnap.empty) {
        console.log("no docs found");
      } else {
        let eventsData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        console.log(eventsData);
        return eventsData;
      }
    } catch (error) {
      console.log("Firestore Failure!", error.message);
    }
  };

  // Function takes a unique id as input in order to delete selected event. Unique id is retrieved using getselectedDoc function
  const deleteEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return deleteDoc(eventDoc);
  };

  // Need to be able to delete doc from firebase and the user interface
  const handleEventClick = async (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const data = await getselectedDoc(clickInfo);
      const id = data[0].DOC_ID;
      deleteEvent(id);
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  // const handleEventAdd = async (e) => {
  //   console.log(e.event)

  // }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        {/* { &&<CalendarForm/>} */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          businessHours={true}
          events={eventsData}
          weekends={weekendsVisible}
          select={handleDateSelect}
          // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          //eventAdd={handleEventAdd}
          //eventContent= {test}
          /* you can update a remote database when these fire:
        
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
      {openmodal.check && <CalendarModal data={openmodal} method={method} />}
    </div>
  );
}
