import { TextField } from '@material-ui/core';
import React from 'react'

interface IDateProps {
  todayDate: any;
  handleDateChange: (args: any) => void
}

const DatePicker: React.FC<IDateProps> = ({ todayDate, handleDateChange }) => {
  return (
    <div>
      <TextField
        id="date"
        label="Date"
        type="date"
        onChange={handleDateChange}
        defaultValue={todayDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export default DatePicker
