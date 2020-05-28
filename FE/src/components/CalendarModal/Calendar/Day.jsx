/** @jsx jsx */
import { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import { jsx } from "@emotion/core";
import DatepickerContext from "./DatepickerContext";
import getColor from "@CalendarModal/Calendar/getColor";

function Day({ dayLabel, date }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  if (!dayLabel) {
    return <div />;
  }

  const getColorFn = getColor(isSelected, isSelectedStartOrEnd, isWithinHoverRange, disabledDate);

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      css={{
        fontWeight: "bold",
        fontSize: "12px",
        padding: "16px",
        border: 0,
        borderRadius: "30px",
        outline: 0,
        color: getColorFn({
          selectedFirstOrLastColor: "#FFFFFF",
          normalColor: "#1C1C1C",
          selectedColor: "#2E2E2E",
          rangeHoverColor: "#2E2E2E",
          disabledColor: "#808285",
        }),
        background: getColorFn({
          selectedFirstOrLastColor: "#2E2E2E",
          normalColor: "#FFFFFF",
          selectedColor: "#F2F2F2",
          rangeHoverColor: "#F2F2F2",
          disabledColor: "#FFFFFF",
        }),
      }}
    >
      {dayLabel}
    </button>
  );
}

export default Day;
