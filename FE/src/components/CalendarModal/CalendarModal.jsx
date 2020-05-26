import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from "react-dates";

const CalendarModal = () => {
  return (
    <>
      <DayPickerRangeController
        startDate={moment("2020-05-26", "YYYY-MM-DD")} // momentPropTypes.momentObj or null,
        endDate={moment("2020-06-01", "YYYY-MM-DD")} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => useState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => useState({ focusedInput })} // PropTypes.func.isRequired,
        initialVisibleMonth={() => moment().add(2, "M")}
      />
    </>
  );
};

export default CalendarModal;
