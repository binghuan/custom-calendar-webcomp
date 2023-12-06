import React, { useEffect, useRef } from 'react';
import { Container, Grid } from '@material-ui/core';
import CalendarView from './Components/CalendarView';
import TodayView from './Components/TodayView';

function App() {
  const todayViewRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // Optionally, validate the message origin
      // if (event.origin !== "https://expected-origin.com") return;

      console.log('Message received from iframe:', event.data);
      // Handle the message here
    };

    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
