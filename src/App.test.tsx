import React from 'react';
import { render } from '@testing-library/react';
import LessonCard from './pages/lesson-card.component';
import moment from 'moment';
import DatePicker from './pages/date-picker.component';
import CreateEventModal from './pages/create-event-modal.component';

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
  test('date picker rendered', () => {
    const createNewEvent = jest.fn()

    render(
      <CreateEventModal 
        createNewEvent={createNewEvent}
      />
    )
  });
})
