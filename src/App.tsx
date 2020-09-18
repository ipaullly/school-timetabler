import React from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { GrOverview } from "react-icons/gr";
import "./App.scss";

const classRoom1 = [
  {
    lesson: "Swa",
    teacher: 1,
  },
  {
    lesson: "Bio",
    teacher: 3,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "Phy",
    teacher: 2,
  },
  {
    lesson: "Phy",
    teacher: 2,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "Math",
    teacher: 1,
  },
];

const classRoom2 = [
  {
    lesson: "Chem",
    teacher: 2,
  },
  {
    lesson: "Geo",
    teacher: 1,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "His",
    teacher: 3,
  },
  {
    lesson: "Math",
    teacher: 1,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "CRE",
    teacher: 3,
  },
];

const classRoom3 = [
  {
    lesson: "Bio",
    teacher: 3,
  },
  {
    lesson: "Eng",
    teacher: 2,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "Swa",
    teacher: 1,
  },
  {
    lesson: "His",
    teacher: 3,
  },
  {
    lesson: "",
    teacher: 0,
  },
  {
    lesson: "Phy",
    teacher: 2,
  },
];

function App() {
  return (
    <div className="App">
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
            <div className="timeTableBody">
              <div className="lessonRow">
                <div className="day">M</div>
                {classRoom1.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">O</div>
                {classRoom2.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">N</div>
                {classRoom3.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="timeTableBody">
              <div className="lessonRow">
                <div className="day">T</div>
                {classRoom1.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">U</div>
                {classRoom2.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">E</div>
                {classRoom3.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="timeTableBody">
              <div className="lessonRow">
                <div className="day">W</div>
                {classRoom1.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">E</div>
                {classRoom2.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">D</div>
                {classRoom3.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="timeTableBody">
              <div className="lessonRow">
                <div className="day">T</div>
                {classRoom1.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">H</div>
                {classRoom2.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">U</div>
                {classRoom3.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="timeTableBody">
              <div className="lessonRow">
                <div className="day">F</div>
                {classRoom1.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">R</div>
                {classRoom2.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
              <div className="lessonRow">
                <div className="day">I</div>
                {classRoom3.map(({ lesson, teacher }, index) => (
                  <div className="lesson" key={index}>
                    <span>{lesson}</span>
                    {teacher === 0 ? null : <span>{teacher}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
