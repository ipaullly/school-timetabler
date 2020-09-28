import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { RiDeleteBin2Line } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  inputField: {
    margin: "20px 0",
  },
  customButton: {
    backgroundColor: "black",
    color: "white",
  },
  trashIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0 0 10px 10px",
    padding: "10px",
    backgroundColor: "black",
    borderRadius: "50%",
    "& > *": {
      color: "white",
    },
  },
  buttons: {
    "&:nth-child(1)": {
      backgroundColor: "black",
    },
    "& > *": {
      margin: theme.spacing(2),
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const CalendarTitle: React.FC<any> = ({
  calendarSummary,
  calendarDescription,
  deleteCalendar,
  accessRole,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCalendar = async () => {
    await deleteCalendar();
    setOpen(false);
  };

  return (
    <div className="calendarTitle">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "12vw",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {calendarSummary}
        </Typography>
        {accessRole === "owner" ? (
          <div className={classes.trashIcon} onClick={() => handleOpen()}>
            <RiDeleteBin2Line />
          </div>
        ) : null}
      </div>
      <Typography variant="subtitle2" color="textSecondary">
        {calendarDescription}
      </Typography>
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
          <div className={classes.paper}>
            <Typography variant="body2" color="textSecondary">
              Delete the "{calendarSummary}" calendar
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteCalendar()}
            >
              Delete Calendar
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CalendarTitle;
