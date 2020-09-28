import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LessonCard from './pages/lesson-card.component';
import moment from 'moment';
import DatePicker from './pages/date-picker.component';
import CreateEventModal from './pages/create-event-modal.component';
import UpdateEventModal from './pages/edit-calendar.component';
import AssignRoleForm from './pages/assign-role-form.component';
import AddNewCalendar from './pages/add-new-calendar.component';
import HomePage from './pages/home-page.component';
import CalendarTitle from './pages/calendar-title.component';

const { windowGapi } = require('./window')

const loadGapi = () => {
  return windowGapi.load('client:auth2', () => {})
}

// describe('Homepage gapi initialisation', () => {
//   // windowGapi = {};
//   // windowGapi.auth2.getAuthInstance = () => {
//   //   isSignedIn : {
//   //     get : () => true,
//   //     listen : f => f()
//   //   }
//   // };
//   // windowGapi.client.init = (v) => true;
//   // windowGapi.load = (a, f) => f();

//   test('loaded gapi', () => {
//     jest.resetModules(); // to make sure that require will return a new module instance
//     jest.mock("./window", () => ({ windowGapi: { load: (a: any, f: any) => f() } })); // mock whatever you want, even constants

//     // tests
//     const maps = loadGapi();

//     // assertions
//     expect(maps).toBeCalled()

//     // cleanup
//     jest.resetModules(); 
//     // let testGapi = loadGapi();

//     // const originalGapi = global.gapi;
//     // testGapi.load = (a, f: any) => f()
//     // testGapi.client.init = jest.fn().mockImplementation(() => Promise.resolve(true))
//     // testGapi.auth2.getAuthInstance = jest.fn().mockImplementation(() => {
//     //     isSignedIn: {
//     //       get: jest.fn().mockImplementation(() => Promise.resolve(true)),
//     //       listen:  jest.fn().mockImplementation((f) => f())
//     //     }
//     // });
//     // testGapi = originalGapi;
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
    const deleteEvent = jest.fn()
    const currentSummary = 'asdhasd'
    const currentDescription = 'ashbahsdb'
    const currentLocation = 'asbdhabdj'
    const lessonId = 'hbasbdjad'
    render(
      <UpdateEventModal
        currentSummary={currentSummary}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
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
  test('Create calendar form', () => {
    const createCalendarEntry = jest.fn()
    const {getByLabelText, getByText } = render(
      <AddNewCalendar
        createCalendarEntry={createCalendarEntry}
      />
    )
    const input = getByLabelText('Enter Summary');
    fireEvent.change(input, { target: { value: 'Class T'} })
    fireEvent.click(getByText('Generate'))
  
    // expect(createCalendarEntry).toBeCalledTimes(1)
  });
  test('Calendar Title render', () => {
    const calendarSummary=''
    const calendarDescription=''
    const deleteCalendar=''
    const accessRole = jest.fn()
    render(
      <CalendarTitle 
      calendarSummary={calendarSummary}
      calendarDescription={calendarDescription}
      deleteCalendar={deleteCalendar}
      accessRole={accessRole}
      />
    )
  });

})
