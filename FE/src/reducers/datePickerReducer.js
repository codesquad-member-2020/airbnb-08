import { START_DATE } from "@datepicker-react/hooks";

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: START_DATE,
};

const datePickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      if (!action.payload.focusedInput)
        return { ...state, endDate: action.payload.endDate, focusedInput: START_DATE };
      return action.payload;
    case "dateDelete":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export { initialState, datePickerReducer };
