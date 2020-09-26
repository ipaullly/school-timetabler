import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";

import "./assign-role-form.styles.scss";
import {
  Button
} from "@material-ui/core";
import { CustomTextField } from "./assign-role-form.component";

const validationSchema = yup.object({
  email: yup.string().email(),
});

interface IFormProps{
  createCalendarEntry: (args: any) => any,
}

const AddNewCalendar: React.FC<IFormProps> = ({ createCalendarEntry }) => {
  const handleGenerateCalendarSubmit = async (data: any) => {
    const calendarEntry = {
      'summary': data.calendarSummary,
      'timeZone': "Africa/Nairobi",
    }
    return await createCalendarEntry(calendarEntry);
  };

  return (
    <div className="assignRoleContainer"
      style={{
        marginTop: '3vh'
      }}
    >
      <h5>Create New Calendar
      <hr/>
      </h5>
      <Formik
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          calendarSummary: ''
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await handleGenerateCalendarSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <CustomTextField placeholder="school timetable 2" name="calendarSummary" label='Enter Summary'/>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Generate
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewCalendar;
