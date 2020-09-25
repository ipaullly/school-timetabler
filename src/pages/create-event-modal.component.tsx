import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
  TextField,
  Tooltip,
} from "@material-ui/core";
import * as yup from "yup";
import { BsPlusCircleFill } from 'react-icons/bs'
import { Formik, Form, useField } from "formik";
import { CustomTextField } from "./assign-role-form.component";

const validationSchema = yup.object({
  summary: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
});

export const CustomTextAreaField: React.FC<any> = ({
  placeholder,
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      label={label}
      multiline
    />
  );
};

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
    padding: "20px",
  },
  inputField: {
    margin: '20px 0'
  }
}));

interface IFormProps {
  createNewEvent: (args: any) => any;
}

const CreateEventModal: React.FC<IFormProps> = ({ createNewEvent }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateEventSubmit = async (data: any) => {
    const newEvent = {
      summary: data.summary,
      location: data.location,
      description: data.description,
      start: {
        dateTime: data.startDateTime, // 'dateTime': '2020-09-22T11:00:00-07:00',
        timeZone: "Africa/Nairobi",
      },
      end: {
        dateTime: data.endDateTime, // 'dateTime': '2020-09-22T11:00:00-07:00',
        timeZone: "Africa/Nairobi",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    return await createNewEvent(newEvent);
  };

  return (
    <div className="createEvent">
      <div className="button" onClick={() => handleOpen()}>
        <Tooltip style={{ fontSize: '1.4em' }} title="Create a new Lesson" placement="right-start">
          <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.4em' }}><BsPlusCircleFill /></button>
        </Tooltip>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Formik
            validateOnChange={true}
            validationSchema={validationSchema}
            initialValues={{
              summary: "",
              description: "",
              location: "",
              startDateTime: "",
              endDateTime: "",
            }}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              const res = await handleCreateEventSubmit(data);
              console.log(res, "Formik");

              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className={classes.form}>
                <CustomTextField
                  placeholder="Summary"
                  name="summary"
                  label="Event Summary"
                  className={classes.inputField}
                />
                <CustomTextAreaField
                  placeholder="Description"
                  name="description"
                  type="textarea"
                  label="Description"
                  className={classes.inputField}
                />
                <CustomTextField
                  placeholder="Location"
                  name="location"
                  label="Location"
                  className={classes.inputField}
                />
                <div>
                  <Button disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
