import React from 'react';
import { render } from '@testing-library/react';
import LessonCard from './pages/lesson-card.component';
import moment from 'moment';
import DatePicker from './pages/date-picker.component';
import CreateEventModal from './pages/create-event-modal.component';
import { windowGapi } from './window';
import UpdateEventModal from './pages/edit-calendar.component';
import AssignRoleForm from './pages/assign-role-form.component';
import AddNewCalendar from './pages/add-new-calendar.component';

// describe('Homepage gapi initialisation', () => {
//   windowGapi = {};
//   windowGapi.auth2.getAuthInstance = () => {isSignedIn : {get : () => true, listen : f => f()}};
//   windowGapi.client.init = (v) => true;
//   windowGapi.load = (a, f) => f();
//   test('loaded gapi', () => {

//   })
// })

describe('Components render', () => {
  test('renders lesson card', () => {
    const updateEvent = jest.fn();
    const lesson = {
      location: 'home',
      summary: 'home',
      start: {
        dateTime: moment.utc()
      },
      end: {
        dateTime: moment.utc()
      },
      description: 'sadasdad',
      id: 'sadsadasd'
    }
    render(<LessonCard 
      updateEvent={updateEvent}
      lesson={lesson}
    />)
  });
  test('date picker rendered', () => {
    const todayDate = moment.utc()
    const handleDateChange = jest.fn()

    render(
      <DatePicker 
        todayDate={todayDate}
        handleDateChange={handleDateChange}
      />
    )
  });
  test('Create event component', () => {
    const createNewEvent = jest.fn()

    render(
      <CreateEventModal 
        createNewEvent={createNewEvent}
      />
    )
  });
  test('Update modal', () => {
    const updateEvent = jest.fn()
    const currentSummary = 'asdhasd'
    const currentDescription = 'ashbahsdb'
    const currentLocation = 'asbdhabdj'
    const lessonId = 'hbasbdjad'
    render(
      <UpdateEventModal
        currentSummary={currentSummary}
        updateEvent={updateEvent}
        lessonId={lessonId}
        currentLocation={currentLocation}
        currentDescription={currentDescription}
      />
    )
  });
  test('Assign role form', () => {
    const createAclEntry = jest.fn()
    render(
      <AssignRoleForm
      createAclEntry={createAclEntry}
      />
    )
  });
  test('Assign role form', () => {
    const createCalendarEntry = jest.fn()
    render(
      <AddNewCalendar
        createCalendarEntry={createCalendarEntry}
      />
    )
  });
})
