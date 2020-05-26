import React, { useState } from "react";
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import { jsx } from "@emotion/core";
import Month from "@CalendarModal/Calendar/Month";
import NavButton from "@CalendarModal/Calendar/NavButton";
import DatepickerContext from "@CalendarModal/Calendar/DatepickerContext";

function Datepicker() {
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  });
  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
  });

  function handleDateChange(data) {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  }

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      {/* <div>
        <strong>Focused input: </strong>
        {state.focusedInput}
      </div>
      <div>
        <strong>Start date: </strong>
        {state.startDate && state.startDate.toLocaleString()}
      </div>
      <div>
        <strong>End date: </strong>
        {state.endDate && state.endDate.toLocaleString()}
      </div> */}
      <div
        style={{
          position: "absolute",
          top: "17px",
          width: "700px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: "3",
        }}
      >
        <NavButton onClick={goToPreviousMonths}>Previous</NavButton>
        <NavButton onClick={goToNextMonths}>Next</NavButton>
      </div>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gridGap: "0 32px",
          height: "100%",
        }}
      >
        {activeMonths.map((month) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
          />
        ))}
      </div>
    </DatepickerContext.Provider>
  );
}

export default Datepicker;
