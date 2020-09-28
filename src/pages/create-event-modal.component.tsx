import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Modal,
  TextField,
  Tooltip,
} from "@material-ui/core";
import * as yup from "yup";
import { BsPlusCircleFill } from 'react-icons/bs'
import { Formik, Form, useField } from "formik";
import { CustomTextField } from "./assign-role-form.component";
import moment from "moment";

const validationSchema = yup.object({
  summary: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
});

export const CustomDateField: React.FC<any> = ({
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
      variant="outlined"
      label={label}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export const CustomTextAreaField: React.FC<any> = ({
  placeholder,
  label,
  id,
  helpTextId,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input {...field} placeholder={placeholder} id={id} aria-describedby={helpTextId} multiline error={!!errorText}/>
      <FormHelperText id={helpTextId}>{errorText}</FormHelperText>
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
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
  textField: {
    padding: 50
  },
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
    console.log( moment(data.startDateTime).format(), 'committee crap');
    console.log( moment(data.endDateTime).format(), 'committee crap');
    const newEvent = {
      summary: data.summary,
      location: data.location,
      description: data.description,
      start: {
        dateTime: moment(data.startDateTime).format(), // 'dateTime': '2020-09-22T11:00:00-07:00',
        timeZone: "Africa/Nairobi",
      },
      end: {
        dateTime: moment(data.endDateTime).format(), // 'dateTime': '2020-09-22T11:00:00-07:00',
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
            onSubmit={async (data) => {
              await handleCreateEventSubmit(data);
              handleClose();
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className={classes.form}>
                <CustomTextField
                  placeholder="Summary"
                  name="summary"
                  label="Event Summary"
                  className={classes.textField}
                />
                <CustomTextAreaField
                  placeholder="Description"
                  name="description"
                  type="textarea"
                  label="Description"
                  className={classes.textField}
                />
                <CustomTextField
                  placeholder="Location"
                  name="location"
                  label="Location"
                  className={classes.textField}
                />
                <CustomDateField
                  placeholder="start time"
                  name="startDateTime"
                  
                  label="Start time"
                />
                <CustomDateField
                  placeholder="start time"
                  name="endDateTime"
                  
                  label="End time"
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
