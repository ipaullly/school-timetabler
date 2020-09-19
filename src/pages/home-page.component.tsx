import React from 'react'
import { AiOutlineSchedule } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { GrOverview } from "react-icons/gr";
import TimeTableBody from '../components/time-table-body.component';
import { CLASS_ROOM_DATA } from '../utils/dummyDataLessons';

import './home-page.styles.scss'

const HomePage = () => {
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
          <span>Timetable</span>
          <span>[ That day's date ]</span>
        </div>
        <div className="timeTableGrid">
          <div className="timeTableHead">
            <div
              className="first"
              style={{
                visibility: "hidden",
              }}
            >
              \
            </div>
            <div className="first">8.00 am - 9.00 am</div>
            <div className="second">9.00 am - 10.00 am</div>
            <div className="third">BREAK</div>
            <div className="fourth">10.30 am - 11.30 am</div>
            <div className="fifth">11.30 am - 12.30 pm</div>
            <div className="sixth">LUNCH</div>
            <div className="seventh">2.00 pm - 3.00 pm</div>
          </div>
          <TimeTableBody 
            classRoom1={CLASS_ROOM_DATA.classRoom1}
            classRoom2={CLASS_ROOM_DATA.classRoom2}
            classRoom3={CLASS_ROOM_DATA.classRoom3}
            day={['M','O','N']}
          />
          <TimeTableBody 
            classRoom1={CLASS_ROOM_DATA.classRoom1}
            classRoom2={CLASS_ROOM_DATA.classRoom2}
            classRoom3={CLASS_ROOM_DATA.classRoom3}
            day={['T','U','E']}
          />
          <TimeTableBody 
            classRoom1={CLASS_ROOM_DATA.classRoom1}
            classRoom2={CLASS_ROOM_DATA.classRoom2}
            classRoom3={CLASS_ROOM_DATA.classRoom3}
            day={['W','E','D']}
          />
          <TimeTableBody 
            classRoom1={CLASS_ROOM_DATA.classRoom1}
            classRoom2={CLASS_ROOM_DATA.classRoom2}
            classRoom3={CLASS_ROOM_DATA.classRoom3}
            day={['T','H','U']}
          />
          <TimeTableBody 
            classRoom1={CLASS_ROOM_DATA.classRoom1}
            classRoom2={CLASS_ROOM_DATA.classRoom2}
            classRoom3={CLASS_ROOM_DATA.classRoom3}
            day={['F','R','I']}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
