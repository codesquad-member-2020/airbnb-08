import React, { useState } from "react";
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import Month from "@CalendarModal/Calendar/Month";
import NavButton from "@CalendarModal/Calendar/NavButton";
import DatepickerContext from "@CalendarModal/Calendar/DatepickerContext";

const Datepicker = () => {
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
    minBookingDate: new Date(),
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
      <div
        style={{
          position: "absolute",
          top: "17px",
          width: "700px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: "3",
          margin: "0 30px 0 30px",
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
          height: "85%",
          margin: "0 30px 0 30px",
        }}
      >
        {console.log(state.startDate, state.endDate, state.focusedInput)}
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
};

export default Datepicker;
