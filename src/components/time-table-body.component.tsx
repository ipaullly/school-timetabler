import React from 'react'

import './time-table-body.styles.scss'

interface ILesson{
  lesson: string;
  teacher: number;
}

interface ITimeTableBodyProps{
  classRoom1: ILesson[];
  classRoom2: ILesson[];
  classRoom3: ILesson[];
  day: string[];
}

const TimeTableBody: React.FC<ITimeTableBodyProps> = ({ classRoom1, classRoom2, classRoom3, day }) => {
  return (
    <div className="timeTableBody">
      <div className="lessonRow">
        <div className="day">{day[0]}</div>
        {classRoom1.map(({ lesson, teacher }, index) => (
          <div className="lesson" key={index}>
            <span>{lesson}</span>
            {teacher === 0 ? null : <span>{teacher}</span>}
          </div>
        ))}
      </div>
      <div className="lessonRow">
        <div className="day">{day[1]}</div>
        {classRoom2.map(({ lesson, teacher }, index) => (
          <div className="lesson" key={index}>
            <span>{lesson}</span>
            {teacher === 0 ? null : <span>{teacher}</span>}
          </div>
        ))}
      </div>
      <div className="lessonRow">
        <div className="day">{day[2]}</div>
        {classRoom3.map(({ lesson, teacher }, index) => (
          <div className="lesson" key={index}>
            <span>{lesson}</span>
            {teacher === 0 ? null : <span>{teacher}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimeTableBody
