/** @jsx jsx */
import { useMonth } from "@datepicker-react/hooks";
import { jsx } from "@emotion/core";
import Day from "@CalendarModal/Calendar/Day";

function Month({ year, month, firstDayOfWeek }) {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
  });

  const wrapperStyle = { textAlign: "center", margin: "0 0 16px" };

  const weekStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    justifyContent: "center",
    marginBottom: "10px",
    fontSize: "10px",
  };

  const weekdayLabelStyle = { textAlign: "center" };

  const dayStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    justifyContent: "center",
  };

  return (
    <div>
      <div css={wrapperStyle}>
        <strong>{monthLabel}</strong>
      </div>
      <div css={weekStyle}>
        {weekdayLabels.map((dayLabel) => (
          <div css={weekdayLabelStyle} key={dayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div css={dayStyle}>
        {days.map((day, index) => {
          if (typeof day === "object") {
            return <Day date={day.date} key={day.date.toString()} dayLabel={day.dayLabel} />;
          }
          return <div key={index} />;
        })}
      </div>
    </div>
  );
}

export default Month;
