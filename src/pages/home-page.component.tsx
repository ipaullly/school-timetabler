import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./home-page.styles.scss";
import AssignRoleForm from "./assign-role-form.component";
import CreateEventModal from "./create-event-modal.component";
import moment from "moment";
import DatePicker from "./date-picker.component";
import LessonCard from "./lesson-card.component";
import { SiGoogleclassroom } from "react-icons/si";
import { GrPower } from "react-icons/gr";
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import { MdSearch } from "react-icons/md";
import AddNewCalendar from "./add-new-calendar.component";
import useGapi from "../customHooks/useGapi";
import CalendarTitle from "./calendar-title.component";

const checkEmptyObject = (res: any) => {
  return Object.keys(res).length === 0 && res.constructor === Object
}

const HomePage: React.FC = () => {
  const [gapi, auth, isSigned] = useGapi();
  const [calendarList, setCalendarList] = useState<any>([]);
  const [schoolCalendarId, setSchoolCalendarId] = useState("");
  const [todayHeader, setTodayHeader] = useState<any>(
    moment().format("dddd, MMMM Do YYYY")
  );
  const [startOfDay, setStartOfDay] = useState(
    moment().startOf("day").toISOString(true)
  );
  const [endOfDay, setEndOfDay] = useState(
    moment().endOf("day").toISOString(true)
  );
  const [initialTodayDate, setInitialTodayDate] = useState<any>(
    moment().toISOString(true)
  );
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
        setSchoolCalendarId(items[0].id);
      } else if ("error" in event) {
        toast.error(event.data[0].message);
      }
    });
  }, [gapi]);

  const getCalendar = useCallback(
    (todayMoment: any) => {
      const request = gapi.client.calendar.events.list({
        calendarId: schoolCalendarId,
        timeMin: startOfDay,
        timeMax: endOfDay,
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
    },
    [gapi, schoolCalendarId, startOfDay, endOfDay]
  );

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
      if ("etag" in event) {
        toast.success("Role assigned successfully!");
      }
    });
  };

  const createCalendarEntry = (calendarEntry: any) => {
    const request = gapi.client.calendar.calendars.insert(calendarEntry);

    return request.execute((event: any) => {
      if ("etag" in event) {
        toast.success("New Calendar added");
        getCalendarList();
      }
    });
  };

  const deleteCalendar = () => {
    const request = gapi.client.calendar.calendars.delete({
      calendarId: schoolCalendarId,
    });

    return request.execute((event: any) => {
      if (checkEmptyObject(event.result)) {
        console.log(event, 'delete response');
        getCalendarList();
        toast.success("Calendar deleted");
      } else {
        console.log(event, 'deletedCalendar');
      }
    });
  }

  const updateCalendar = (updatedCalendar: any) => {
    const request = gapi.client.calendar.calendars.patch({
      calendarId: schoolCalendarId,
      resource: updatedCalendar,
    });

    return request.execute((event: any) => {
      console.log(event, 'patch clicked');
      
      if ("etag" in event) {
        toast.success("Calendar patched");
        getCalendarList();
      } else {
        console.log(event, 'error in calendar patch');
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
      if ("etag" in event) {
        toast.success("lesson updated");
        getCalendar(initialTodayDate);
      }
    });
  };

  const deleteEvent = (deletedEventId: any) => {
    const eventRequest = gapi.client.calendar.events.delete({
      calendarId: schoolCalendarId,
      eventId: deletedEventId,
    });

    return eventRequest.execute((event: any) => {
      if (checkEmptyObject(event.result)) {
        toast.success("lesson deleted from calendar");
        getCalendar(initialTodayDate);
      } else {
        console.log(event, 'deletedEvent');
        toast.error(event.message)
      }
    });
  };

  const createNewEvent = (newEvent: any) => {
    const eventRequest = gapi.client.calendar.events.insert({
      calendarId: schoolCalendarId,
      resource: newEvent,
    });

    return eventRequest.execute((event: any) => {
      if ("etag" in event) {
        toast.success("lesson created");
        getCalendar(initialTodayDate);
      }
      if ("error" in event) {
        toast.error(event.message);
      }
    });
  };

  const handleDateChange = (date: any) => {
    console.log(moment(date.target.value).toISOString(true));
    setTodayDate(moment(date.target.value).toISOString(true));
  };

  useEffect(() => {
    try {
      setLessons(null);
      getCalendar(initialTodayDate);
    } catch (error) {}
  }, [schoolCalendarId, initialTodayDate, getCalendar]);

  const handleCalendarSelectClick = (id: any) => {
    setSchoolCalendarId(id);
  };

  const handleSearch = () => {
    getCalendar(todayDate);
    setTodayHeader(moment(todayDate).format("dddd, MMMM Do YYYY"));
    setStartOfDay(moment(todayDate).startOf("day").toISOString(true));
    setEndOfDay(moment(todayDate).endOf("day").toISOString(true));
  };

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
      {isSigned === null ? (
        <div className="gapiNotLoading">
          <Typography variant="body2">
            Google API library not initiated, refresh window
          </Typography>
        </div>
      ) : isSigned ? (
        <div className="loadContainer">
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
                  component="div"
                  style={{ textTransform: "uppercase" }}
                >
                  Timetables
                </Typography>
              </div>
              <Divider style={{ minWidth: "12vw" }} />
              <div className="myCalendars">
                {calendarList ? (
                  calendarList.map((calendar: any) => (
                    <div className="calendarCard" key={calendar.id}>
                      <Typography
                        variant="body1"
                        style={{
                          backgroundColor: calendar.backgroundColor,
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                        onClick={() => handleCalendarSelectClick(calendar.id)}
                      >
                        {calendar.summary}
                      </Typography>
                      <Typography variant="caption">
                        {calendar.accessRole}
                      </Typography>
                    </div>
                  ))
                ) : (
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
                  <div className="searchIcon" onClick={() => handleSearch()}>
                    <MdSearch />
                  </div>
                </div>
              </div>
              <CalendarTitle 
                calendarDescription={calendarDescription}
                calendarSummary={calendarSummary}
                deleteCalendar={deleteCalendar}
                updateCalendar={updateCalendar}
                accessRole={accessRole}
              />
            </div>
            <div className="timeTableGrid">
              {lessons ? (
                Array.isArray(lessons) && lessons.length ? (
                  lessons.map((lesson: any, index: number) => (
                    <div key={index}>
                      <LessonCard
                        lesson={lesson}
                        accessRole={accessRole}
                        updateEvent={updateEvent}
                        deleteEvent={deleteEvent}
                      />
                    </div>
                  ))
                ) : (
                  <div className="emptyCalendar">
                    <Typography variant="subtitle2" color="textSecondary">
                      No Lessons today
                    </Typography>
                  </div>
                )
              ) : (
                <div className="spinner">
                  <CircularProgress />
                </div>
              )}
            </div>
            {lessons ? (
              accessRole === 'owner' || accessRole === 'writer'? (
                <CreateEventModal createNewEvent={createNewEvent} />
              ): null
            ) : null}
          </div>
          <div className="actionBar">
            {isSigned === null ? (
              <div className="gapiNotLoading">
                <Typography variant="body2">
                  Google API library not initiated, refresh window
                </Typography>
              </div>
            ) : (
              <div className="signOffHeader">
                <div className="calendarAccess">{accessRole}</div>
                <div className="signOff" onClick={() => handleSignOut()}>
                  <GrPower />
                </div>
              </div>
            )}
            {accessRole === "owner" ? (
              <AssignRoleForm createAclEntry={createAclEntry} />
            ) : null}
            <AddNewCalendar createCalendarEntry={createCalendarEntry} />
          </div>
        </div>
      ) : (
        <div className="login">
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
          <div className="button" onClick={() => handleSignIn()}>
            Login
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
