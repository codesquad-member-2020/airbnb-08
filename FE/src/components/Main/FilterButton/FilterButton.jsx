import React from "react";
import styled from "styled-components";
import GuestCountModal from "@GuestCountModal/GuestCountModal";
import CalendarModal from "@CalendarModal/CalendarModal";
import PriceModal from "@PriceModal/PriceModal";
import { useSelector } from "react-redux";
import moment from "moment";

const Wrapper = styled.div`
  border-radius: 20px;
  padding: 10px 15px;
  margin: 10px 5px;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px ${(props) => props.theme.subColor};
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.mainColor};
  }
`;

const FilterButton = ({
  filterButtonClickHandler,
  dateVisible,
  guestVisible,
  priceVisible,
  modal,
}) => {
  const { guestCountReducer, datePickerReducer } = useSelector((state) => state);
  const { totalCount, babyCount } = guestCountReducer;
  const { startDate, endDate } = datePickerReducer;

  const showResult = () => {
    switch (modal) {
      case "date":
        if (!startDate && !endDate) return "날짜";
        const start = moment(startDate).format("yyyy-MM-DD");
        const end = moment(endDate).format("yyyy-MM-DD");
        return start && !endDate ? `${start} - 체크아웃` : `${start} - ${end}`;
      case "guest":
        if (!totalCount && !babyCount) return "인원";
        return totalCount && !babyCount
          ? `게스트 ${totalCount}명`
          : `게스트 ${totalCount}명, 유아 ${babyCount}명`;
      case "price":
        return "요금";
      default:
        break;
    }
  };

  return (
    <>
      <Wrapper
        onClick={() => {
          filterButtonClickHandler(modal);
        }}
      >
        {showResult()}
        <CalendarModal
          dateVisible={dateVisible}
          modal={modal}
          closeClickHandler={filterButtonClickHandler}
        />
        {guestVisible && (
          <GuestCountModal modal={modal} closeClickHandler={filterButtonClickHandler} />
        )}
        {priceVisible && <PriceModal modal={modal} />}
      </Wrapper>
    </>
  );
};

export default FilterButton;
