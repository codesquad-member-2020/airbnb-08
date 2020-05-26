import React, { useReducer } from "react";
import { DateRangeInput, DateSingleInput, Datepicker } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";
import Calendar from "@CalendarModal/Calendar/DatePicker";
import styled from "styled-components";

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 170px;
  width: 760px;
  height: 400px;
  padding: 50px 30px 30px 30px;
  background: white;
  border: solid 1px ${(props) => props.theme.subColor};
  border-radius: 10px;
  box-sizing: border-box;
`;

const CalendarModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Wrapper>
        <Calendar />
      </Wrapper>
    </>
  );
};

export default CalendarModal;

{
  /* <ThemeProvider
theme={{
  breakpoints: ["32em", "48em", "64em"],
  reactDatepicker: {
    daySize: [36, 40],
    fontFamily: "system-ui, -apple-system",
    colors: {
      accessibility: "#D80249",
      selectedDay: "#f4777a",
      selectedDayHover: "#ea9899",
      primaryColor: "#FC5A5F",
    },
  },
}}
>
<DateRangeInput
  onDatesChange={(data) => dispatch({ type: "dateChange", payload: data })}
  onFocusChange={(focusedInput) => dispatch({ type: "focusChange", payload: focusedInput })}
  startDate={state.startDate} // Date or null
  endDate={state.endDate} // Date or null
  focusedInput={state.focusedInput} // START_DATE, END_DATE or null
/>
</ThemeProvider> */
}
