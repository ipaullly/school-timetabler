import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./home-page.styles.scss";
import AssignRoleForm from "./assign-role-form.component";
import CreateEventModal from "./create-event-modal.component";
import moment from "moment";
import DatePicker from "./date-picker.component";
import LessonCard from "./lesson-card.component";
import { SiGoogleclassroom } from "react-icons/si";
import { GrPower } from 'react-icons/gr';
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import { MdSearch } from "react-icons/md";
import AddNewCalendar from "./add-new-calendar.component";
import useGapi from "../customHooks/useGapi";

const HomePage: React.FC = () => {
  const [gapi, auth, isSigned] = useGapi();
  const [calendarList, setCalendarList] = useState<any>([]);
  const [schoolCalendarId, setSchoolCalendarId] = useState("");
  const [todayHeader, setTodayHeader] = useState<any>(
    moment().format("dddd, MMMM Do YYYY")
  );
  const [initialTodayDate, setInitialTodayDate] = useState<any>(moment().toISOString(true))
  const [lessons, setLessons] = useState<any>();
  const [todayDate, setTodayDate] = useState<any>("");
  const [accessRole, setAccessRole] = useState<any>("");
  const [calendarSummary, setCalendarSummary] = useState<any>("");
  const [calendarDescription, setCalendarDescription] = useState<any>("");

  const getCalendarList = useCallback(() => {
    const request = gapi.client.calendar.calendarList.list();
    request.execute((event: any) => {
      if ("etag" in event) {
        const { items } = event;
        setCalendarList(items);
        setSchoolCalendarId(items[0].id)
      } else if ("error" in event) {
        toast.error(event.data[0].message);
      }
    });
  }, [gapi]);

  const getCalendar = useCallback((todayMoment: any) => {
    const request = gapi.client.calendar.events.list({
      calendarId: schoolCalendarId,
      timeMin: todayMoment,
      singleEvents: true,
      orderBy: "startTime",
      timeZone: "Africa/Nairobi",
    });
    request.execute((event: any) => {
      if ("etag" in event) {
        setLessons(event.items);
        setAccessRole(event.accessRole);
        setCalendarSummary(event.summary);
        setCalendarDescription(event.description);
      } else if ("error" in event) {
        toast.error(event.data[0].message);
      }
    });
  }, [gapi, schoolCalendarId]);

  useEffect(() => {
    if (isSigned) {
      getCalendarList();
    }
  }, [isSigned, getCalendarList]);

  useEffect(() => {
    if (schoolCalendarId) {
      getCalendar(initialTodayDate);
    }
  }, [getCalendar, schoolCalendarId, initialTodayDate]);

  const createAclEntry = (aclEntry: any) => {
    const request = gapi.client.calendar.acl.insert({
      calendarId: schoolCalendarId,
      resource: aclEntry,
    });

    return request.execute((event: any) => {
      console.log(event, "calendar acl role added");
    });
  };

  const createCalendarEntry = (calendarEntry: any) => {
    const request = gapi.client.calendar.calendars.insert(calendarEntry);

    return request.execute((event: any) => {
      console.log(event, "new calendar added");
      if ('etag' in event) {
        toast.success('New Calendar added')
        getCalendarList()
      }
    });
  }

  const updateEvent = (updatedEvent: any) => {
    const eventRequest = gapi.client.calendar.events.patch({
      calendarId: schoolCalendarId,
      eventId: updatedEvent.id,
      resource: updatedEvent,
    });

    return eventRequest.execute((event: any) => {
      console.log(event, "event patched");
      if ("etag" in event) {
        toast.success("lesson updated");
        getCalendar(initialTodayDate);
      }
    });
  };

  const createNewEvent = (newEvent: any) => {
    const eventRequest = gapi.client.calendar.events.insert({
      calendarId: schoolCalendarId,
      resource: newEvent,
    });

    return eventRequest.execute((event: any) => {
      console.log(event, "event created");
      if ("etag" in event) {
        toast.success("lesson created");
        getCalendar(initialTodayDate);
      }
      if ("error" in event) {
        toast.error(event.message)
      }
    });
  };

  const handleDateChange = (date: any) => {
    console.log(moment(date.target.value).toISOString(true));
    setTodayDate(moment(date.target.value).toISOString(true));
    setTodayHeader(moment(date.target.value).format("dddd, MMMM Do YYYY"));
  };

  const handleCalendarSelectClick = async (id: any) => {
    setSchoolCalendarId(id);
    await getCalendar(initialTodayDate);
  }

  const handleSignIn = () => {
    auth.current.signIn().then(() => {
      toast.success("sign in successful!");
    });
  };

  const handleSignOut = () => {
    auth.current.disconnect();
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
          <div>
            <Typography
              variant="h6"
              color="textSecondary"
              component='div'
              style={{ textTransform: "uppercase" }}
            >
              Timetables
            </Typography>
          </div>
          <Divider style={{ minWidth: '12vw' }}/>
          <div className="myCalendars">
            {calendarList? calendarList.map((calendar: any, index: number) => (
              <div className="calendarCard" key={index}
                onClick={() => handleCalendarSelectClick(calendar.id)}
              >
                <Typography variant='body1'
                  style={{
                    backgroundColor: calendar.backgroundColor,
                    borderRadius: '5px',
                    padding: '10px'
                  }}
                >{calendar.summary}</Typography>
                <Typography variant='caption'>{calendar.accessRole}</Typography>
              </div>
            )) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
      <div className="mainContent">
        <div className="header">
          <div className="datePicker">
            <div className="datePickerHeader">{"" + todayHeader}</div>
            <div className="datePickerSearch">
              <DatePicker
                todayDate={todayDate}
                handleDateChange={handleDateChange}
              />
              <div className="searchIcon"
                onClick={() => getCalendar(todayDate)}
              >
                <MdSearch />
              </div>
            </div>
          </div>
          <div className="calendarTitle">
            <Typography variant="h6" gutterBottom>
              {calendarSummary}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {calendarDescription}
            </Typography>
          </div>
        </div>
        <div className="timeTableGrid">
          {lessons ? (
            lessons.map((lesson: any, index: number) => (
              <div key={index}>
                <LessonCard lesson={lesson} updateEvent={updateEvent} />
              </div>
            ))
          ) : (
            <div className="spinner">
              <CircularProgress />
            </div>
          )}
        </div>
        {lessons ? <CreateEventModal createNewEvent={createNewEvent} /> : null}
      </div>
      <div className="actionBar">
        {isSigned === null ? (
          "gapi not initiated"
        ) : isSigned ? (
          <div className="signOffHeader">
            <div className="calendarAccess">{accessRole}</div>
            <div className="signOff" onClick={() => handleSignOut()}>
              <GrPower />
            </div>
          </div>
        ) : (
          <div className="button" onClick={() => handleSignIn()}>
            Login
          </div>
        )}
        {
          accessRole === 'owner'? (
            <AssignRoleForm createAclEntry={createAclEntry} />
          ): null
        }
        <AddNewCalendar createCalendarEntry={createCalendarEntry}/>
      </div>
    </div>
  );
};

export default HomePage;
