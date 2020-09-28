import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";

import "./assign-role-form.styles.scss";
import { Button, makeStyles } from "@material-ui/core";
import { CustomTextField } from "./assign-role-form.component";
import { CustomTextAreaField } from "./create-event-modal.component";

const validationSchema = yup.object({
  email: yup.string().email(),
});

interface IFormProps {
  createCalendarEntry: (args: any) => any;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px dashed #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  }
}));

const AddNewCalendar: React.FC<IFormProps> = ({ createCalendarEntry }) => {
  const classes = useStyles();
  const handleGenerateCalendarSubmit = async (data: any) => {
    const calendarEntry = {
      summary: data.calendarSummary,
      description: data.calendarDescription,
      timeZone: "Africa/Nairobi",
    };
    return await createCalendarEntry(calendarEntry);
  };

  return (
    <div
      className="assignRoleContainer"
      style={{
        marginTop: "3vh",
      }}
    >
      <h5>
        Create New Calendar
        <hr />
      </h5>
      <Formik
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          calendarSummary: "",
          calendarDescription: ""
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await handleGenerateCalendarSubmit(data);
          setSubmitting(false);
          resetForm()
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className={classes.form}>
            <CustomTextField
              placeholder="school timetable 2"
              name="calendarSummary"
              label="Enter Summary"
              id="new-calendar-summary"
              helpTextId='new-calendar-summary-helper'
            />
            <CustomTextAreaField
              placeholder="Calendar Description"
              name="calendarDescription"
              type="textarea"
              label="Enter Description"
            />
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
