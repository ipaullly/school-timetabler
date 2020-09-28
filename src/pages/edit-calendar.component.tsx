import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomTextField } from "./assign-role-form.component";
import { CustomTextAreaField } from "./create-event-modal.component";

const validationSchema = yup.object({
  summary: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
});

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
  },
  customButton: {
    backgroundColor: 'black',
    color: 'white'
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(2),
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

interface IFormProps {
  updateEvent: (args: any) => any;
  deleteEvent: (args: any) => any;
  currentSummary: string;
  currentDescription: string;
  currentLocation: string;
  lessonId: string;
}

const UpdateEventModal: React.FC<IFormProps> = ({ updateEvent, deleteEvent, currentDescription, currentLocation, currentSummary, lessonId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditEventSubmit = async (data: any) => {
    const newEvent = {
      summary: data.summary,
      location: data.location,
      description: data.description,
      id: lessonId,
    };
    return await updateEvent(newEvent);
  };

  const handleDeleteEvent = async () => {
    await deleteEvent(lessonId)
    setOpen(false);
  }

  return (
    <div className="createEvent">
      <div className="button" onClick={() => handleOpen()}>
        <Button className={classes.customButton} size="small">update lesson</Button>
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
              summary: currentSummary,
              description: currentDescription,
              location: currentLocation,
              startDateTime: "",
              endDateTime: "",
            }}
            onSubmit={async (data, { setSubmitting }) => {
              const res = await handleEditEventSubmit(data);
              setOpen(false);
              console.log(res, "Formik");
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
                <div className={classes.buttons}>
                  <Button disabled={isSubmitting} type="submit" style={{ backgroundColor: 'black', color: 'white'}}>
                    Update Lesson Details
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteEvent()}>
                    Delete Lesson
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

export default UpdateEventModal;
