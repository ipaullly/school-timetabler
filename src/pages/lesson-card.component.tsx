import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Collapse, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { MdExpandMore } from 'react-icons/md'
import UpdateEventModal from './edit-calendar.component';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    // minWidth: 275,
    margin: '10px 5px',
    backgroundColor: '#eee1aa'
  },
  title: {
    fontSize: 13,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  customButton: {
    backgroundColor: 'black',
    color: 'white'
  }
  })
);

const LessonCard: React.FC<any> = ({ updateEvent,lesson }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {lesson.location}
        </Typography>
        <Typography variant="h4" component="h2">
          {lesson.summary}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {moment(lesson.start.dateTime).format("[Starts] hh:mm a")}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {moment(lesson.end.dateTime).format("[Ends] hh:mm a")}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Lesson Description:</Typography>
          <Typography variant="body2">
            {lesson.description}
          </Typography>
        </CardContent>
        <CardActions>
        <UpdateEventModal 
          updateEvent={updateEvent}
          currentDescription={lesson.description}
          currentLocation={lesson.location}
          currentSummary={lesson.summary}
        />
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default LessonCard