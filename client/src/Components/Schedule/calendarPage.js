import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS, createEventId } from "./calendarUtilities";
import { useAuth } from "../../contexts/AuthContext";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
// import AddEventForm from "./AddEventForm";
import "./calendar.css";
import CalendarModal from "../Modals/CalendarModal";
// import EditDeleteEventForm from "./Edit_Delete_EventForm";
import EditDeleteCalendarModal from "../Modals/EditDeleteCalendarModal";
import SelectBusiness from "./SelectBusiness";

export default function CalendarWithSchedule() {
  // Set business hours
  const businessHours = {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5, 6],

    startTime: "09:00",
    endTime: "17:00",
  };

  const { currentUser } = useAuth(); // currentUser refers to authenticated user
  // All State declarations below
  const [currentEvents, setCurrentEvents] = useState([]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [eventsData, setEventsData] = useState([]); // Used when fetching the current events stored in firestore for a unique user
  const [openmodal, setOpenModal] = useState({
    check: false,
    data: "",
  }); // State that determines the rendering of the Add Event Form

  const [removeEvents, setRemoveEvents] = useState({
    check: false,
    data: "",
  }); // State that determine the rendering of the Edit/Remove Event Form

  const [business, setBusiness] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]);

    // Get all business for logged in user
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

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
        <SelectBusiness business={business} selectedBusiness={selectedBusiness} setSelectedBusiness={setSelectedBusiness}/>
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            Weekends
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
    setOpenModal({ check: false });
    setRemoveEvents({ check: false, data: "" });
  };

  // Need to be able to delete doc from firebase and the user interface
  const handleEventClick = (clickInfo) => {
    setRemoveEvents({
      check: true,
      data: clickInfo,
    });
  };

  const handleDateSelect = (selectInfo) => {
    setOpenModal({
      check: true,
      data: selectInfo,
    });
  };

  // Initial fetch of all events from database for the logged in user
  useEffect(() => {
    let collectionRef = collection(db, "events");
    if (currentUser?.uid && selectedBusiness?.DOC_ID) {
      let queryRef = query(collectionRef, where("uid", "==", currentUser.uid),
      where("Business_ID","==", selectedBusiness.DOC_ID)); // logged in user has unique uid linked to events
      console.log(currentUser.uid);
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
    } else {
      console.log("User not logged in");
    }
  }, [currentUser, selectedBusiness]); // triggers when new user logins

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

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
          selectConstraint={businessHours} // ensures user cannot create an event outside of defined business hours
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
      {removeEvents.check && (
        <EditDeleteCalendarModal removeEvents={removeEvents} method={method} />
      )}
      {openmodal.check && <CalendarModal selectedBusiness={selectedBusiness} data={openmodal} method={method} />}
    </div>
  );
}
