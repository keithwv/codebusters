import React, { useState } from 'react'
import FullCalendar, { constrainPoint, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './calendarUtilities'
import { useAuth } from "../../contexts/AuthContext";

export default function CalendarWithSchedule() {


  const [currentEvents, setCurrentEvents] = useState([])
  const [weekendsVisible, setWeekendsVisible] = useState(true)


  // state = {
  //   weekendsVisible: true,
  //   currentEvents: []
  // }

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events (currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
    }
  
    const handleDateSelect = (selectInfo) => {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }

    const handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    }

    const handleEvents = (events) => {
      setCurrentEvents(events)
    }

    const handleEventAdd = (e) => {
      //e.prevent.default()
      console.log(e)
      console.log(e.event.title)
      console.log(e.event.start)
      console.log(e.event.startStr)
      console.log(e.event.endStr)
    }
    
    function renderEventContent(eventInfo) {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      )
    }
    
    function renderSidebarEvent(event) {
      return (
        <li key={event.id}>
          <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
          <i>{event.title}</i>
        </li>
      )
    }

    return (
      <div className='demo-app'>
        {renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={handleEventAdd}
            /* you can update a remote database when these fire:
        
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

 

