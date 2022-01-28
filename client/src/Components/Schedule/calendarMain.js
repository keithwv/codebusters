import React from 'react'
import { render } from 'react-dom'
import './main.css'
import CalendarWithSchedule from './calendarPage.js'

document.addEventListener('DOMContentLoaded', function() {
  render(
    <CalendarWithSchedule />,
    document.body.appendChild(document.createElement('div'))
  )
})
