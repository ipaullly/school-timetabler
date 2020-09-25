import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

import './home-page.styles.scss'
import AssignRoleForm from './assign-role-form.component';
import CreateEventModal from './create-event-modal.component';
import moment from 'moment';
import DatePicker from './date-picker.component';
import LessonCard from './lesson-card.component';
import { AiOutlineSchedule } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { GrOverview, GrPower } from "react-icons/gr";
import { CircularProgress } from '@material-ui/core';

const HomePage: React.FC = () => {

  const gapi: any = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const scopes = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar";
  const [isSigned, setIsSigned] = useState(null);
  const [schoolCalendarId, setSchoolCalendarId] = useState('');
  const [todayHeader, setTodayHeader] = useState<any>(moment().format("dddd, MMMM Do YYYY"));
  const [lessons, setLessons] = useState<any>();
  const [todayDate, setTodayDate] = useState<any>('');
  const [accessRole, setAccessRole] = useState<any>('');
  const [calendarSummary, setCalendarSummary] = useState<any>('');
  const [calendarDescription, setCalendarDescription] = useState<any>('');
  const auth: any = useRef(null);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: discoveryDocs,
        scope: scopes,
      }).then(() => {
        auth.current = gapi.auth2.getAuthInstance();
        setIsSigned(auth.current.isSignedIn.get());
        auth.current.isSignedIn.listen(onAuthChange)
      });
      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    })
  }, [
    isSigned,
    API_KEY,
    CLIENT_ID,
    discoveryDocs,
    scopes,
    gapi
  ])

  const getCalendarList = useCallback(() => {      
    const request = gapi.client.calendar.calendarList.list();
    request.execute((event: any) => {
      if ('etag' in event) {
        console.log(event, 'calendar list');
        
        const { items } = event;
        const schoolCalendar = items.filter((item: any) => item.summary === 'School-Timetabler');
        setSchoolCalendarId(schoolCalendar[0].id)
      } else if ('error' in event){
        console.log(event, 'erronous request');
        toast.error(event.data[0].message);
      }
    })
  },
    [gapi],
  )

  const getCalendar = useCallback(() => {  
    const today = moment();    
    const request = gapi.client.calendar.events.list({
      'calendarId': schoolCalendarId,
      'timeMin': today.toISOString(true),
      'timeZone': 'Africa/Nairobi',
    });
    request.execute((event: any) => {
      if ('etag' in event) {
        console.log(event, 'calendar meta');
        setLessons(event.items);
        setAccessRole(event.accessRole)
        setCalendarSummary(event.summary)
        setCalendarDescription(event.description)
      } else if ('error' in event){
        console.log(event, 'erronous request');
        toast.error(event.data[0].message);
      }
    })
  },[gapi, schoolCalendarId],
  )

  useEffect(() => {
    if (isSigned) {
      getCalendarList()
    }
  }, [isSigned, getCalendarList])

  useEffect(() => {
    if (schoolCalendarId) {
      getCalendar()
    }
  }, [getCalendar,schoolCalendarId])

  const onAuthChange = () => {
    setIsSigned(auth.current.isSignedIn.get())
  }

  const handleCreateEvent = () => {
    const event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2020-09-22T09:00:00-07:00',
        'timeZone': 'Africa/Nairobi'
      },
      'end': {
        'dateTime': '2020-09-22T11:00:00-07:00',
        'timeZone': 'Africa/Nairobi'
      },
      'attendees': [
        {'email': 'ipaullly22@gmail.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    }
    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    })
    request.execute((event: any) => {
      console.log(event, 'executed');
      
    })
  }

  const createAclEntry = (aclEntry: any) => {
    const request = gapi.client.calendar.acl.insert({
      'calendarId': schoolCalendarId,
      // 'auth': auth.current.client,
      'resource': aclEntry
    })

    return request.execute((event: any) => {
      console.log(event, 'calendar acl role added');
    })
  }

  const updateEvent = (updatedEvent: any) => {
    const eventRequest = gapi.client.calendar.events.patch({
      'calendarId': schoolCalendarId,
      // 'auth': auth.current.client,
      'resource': updatedEvent
    })
    
    return eventRequest.execute((event: any) => {
      console.log(event, 'event patched');
    })
  }

  const createNewEvent = (newEvent: any) => {
    const eventRequest = gapi.client.calendar.events.insert({
      'calendarId': schoolCalendarId,
      // 'auth': auth.current.client,
      'resource': newEvent
    })
    
    return eventRequest.execute((event: any) => {
      console.log(event, 'event created');
    })
  }

  const handleDateChange = (date: any) => {
    console.log(date.target.value, 'change date');
    setTodayDate(moment(date.target.value).toISOString(true))
    setTodayHeader(moment(date.target.value).format("dddd, MMMM Do YYYY"))
  }

  const handleSignIn = () => {
    auth.current.signIn().then(() => {
      toast.success('sign in successful!')
      // const profile = auth.current.currentUser.get().getBasicProfile();
    });
  };
  
  const handleSignOut = () => {
    // auth.current.signOut().then(() => {
    //   auth.current.disconnect()
    // });
    auth.current.disconnect()
  };

  return (
    <div className="container">
      <div className="sideBar">
        <div className="sideBarLogo">
          <SiGoogleclassroom />
          <span
            style={{
              fontSize: "0.2em",
              letterSpacing: "2px",
              fontWeight: "bolder",
            }}
          >
            School-Timetabler
          </span>
        </div>
        <div className="sideBarOptions">
          <div className="schedule">
            <AiOutlineSchedule />
            <span>Shedule</span>
          </div>
          <div className="Overview">
            <GrOverview />
            <span>Overview</span>
          </div>
        </div>
      </div>
      <div className="mainContent">
        <div className="header">
        <div>
          {'' + todayHeader}
        </div>
        <DatePicker 
          todayDate={todayDate}
          handleDateChange={handleDateChange}
        />
        </div>
        <div className="timeTableGrid">
          {lessons? lessons.map((lesson: any, index: number) => (
            <div
              key={index}
            >
              <LessonCard 
                lesson={lesson}
                updateEvent={updateEvent}
              />
            </div>
          )) : (
            <div className='spinner'>
              <CircularProgress />
            </div>
          )
        
        }
        </div>
        {
          lessons? (
            <CreateEventModal 
              createNewEvent={createNewEvent}
            />
          ): (
            null
          )
        }
      </div>
      <div className="actionBar">
        {
          isSigned === null? 'gapi not initiated' :(
            isSigned? (
              <div className='signOffHeader'>
                <div className="calendarAccess">
                  {accessRole}
                </div>
                <div 
                  className="signOff"
                  onClick={() => handleSignOut()}
                >
                  <GrPower />
                </div>
              </div>
            ):(
              <div className="button"
                onClick={() => handleSignIn()}
              >
                Login
              </div>
            )
          )
        }
        <AssignRoleForm 
          createAclEntry={createAclEntry}  
        />
      </div>
    </div>
  )
}

export default HomePage
