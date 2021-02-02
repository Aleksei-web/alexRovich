import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function DateInput() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date)
    setStartDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
     
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Начало "
          format="yyyy/dd/MM"
          value={startDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
     
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Конец"
          format="yyyy/dd/MM"
          value={endDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
     
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default DateInput;

