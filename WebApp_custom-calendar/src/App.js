import React, { useRef } from 'react';
import { Container, Grid } from '@material-ui/core';
import CalendarView from './Components/CalendarView';
import TodayView from './Components/TodayView';

function App() {
  const todayViewRef = useRef(null);

  const handleDateClick = (date) => {
    console.log('date clicked', date);
    const formattedDate = date.toISOString();
    if (todayViewRef.current) {
      console.log('sending message to iframe');
      todayViewRef.current.sendMessage({
        type: 'DATE_CLICKED',
        date: formattedDate
      });
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CalendarView onDateClick={handleDateClick} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TodayView ref={todayViewRef} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
