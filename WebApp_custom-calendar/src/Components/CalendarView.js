import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, addMonths, subMonths } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  day: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  date: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

function CalendarView({ onDateClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const classes = useStyles();

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className={classes.header}>
        <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>{'<'}</Button>
        <Typography variant="h6">
          {format(currentMonth, dateFormat)}
        </Typography>
        <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item xs key={i} className={classes.day}>
          {format(addDays(startDate, i), dateFormat)}
        </Grid>
      );
    }

    return <Grid container>{days}</Grid>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <Grid item xs key={cloneDay} className={classes.date} onClick={() => isSameMonth(cloneDay, monthStart) && onDateClick(cloneDay)}>
            {isSameMonth(cloneDay, monthStart) ? format(cloneDay, "d") : ""}
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid container key={day}>
          {days}
        </Grid>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <Paper className={classes.paper}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Paper>
  );
}

export default CalendarView;
