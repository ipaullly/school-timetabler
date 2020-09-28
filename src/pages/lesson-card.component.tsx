import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import UpdateEventModal from './edit-calendar.component';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    margin: '10px 5px',
    backgroundColor: '#eee1aa',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 13,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: 'rotate(0deg)',
    padding: 0,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
  time:{
    marginTop: '2vh',
    fontSize: '5em'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  customButton: {
    backgroundColor: 'black',
    color: 'skyblue'
  }
  })
);

const LessonCard: React.FC<any> = ({ updateEvent,lesson, accessRole, deleteEvent }) => {
  const classes = useStyles();
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <div>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {lesson.location}
          </Typography>
          <Typography variant="h4" component="h2">
            {lesson.summary}
          </Typography>
          <Typography variant='caption'>Lesson Description:</Typography>
          <Typography variant="body2">
            {lesson.description}
          </Typography>
        </div>
        <div className={classes.time}>
          <Typography className={classes.pos} variant="body1" color="textSecondary">
            {moment(lesson.start.dateTime).format("[Starts] hh:mm a")}
          </Typography>
          <Typography className={classes.pos} variant="body1" color="textSecondary">
            {moment(lesson.end.dateTime).format("[Ends] hh:mm a")}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        {accessRole === 'owner'? (<UpdateEventModal 
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          currentDescription={lesson.description}
          currentLocation={lesson.location}
          currentSummary={lesson.summary}
          lessonId={lesson.id}
        />): null}
      
      </CardActions>
    </Card>
  );
}

export default LessonCard