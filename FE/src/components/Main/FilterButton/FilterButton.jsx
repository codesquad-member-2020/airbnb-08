import React from "react";
import styled from "styled-components";
import GuestCountModal from "@GuestCountModal/GuestCountModal";
import CalendarModal from "@CalendarModal/CalendarModal";
import PriceModal from "@PriceModal/PriceModal";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "@/actions/actions";

const Wrapper = styled.div`
  border-radius: 20px;
  padding: 10px 15px;
  margin: 10px 5px;
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
  const dispatch = useDispatch();
  const { totalCount, babyCount } = useSelector((state) => state);

  const showGuestCount = () => {
    if (!totalCount && !babyCount) return "인원";
    return totalCount && !babyCount
      ? `게스트 ${totalCount}명`
      : `게스트 ${totalCount}명, 유아 ${babyCount}명`;
  };

  return (
    <>
      <Wrapper
        onClick={() => {
          filterButtonClickHandler(modal);
        }}
      >
        {showGuestCount()}
      </Wrapper>
      {dateVisible && <CalendarModal modal={modal} />}
      {guestVisible && (
        <GuestCountModal modal={modal} closeClickHandler={filterButtonClickHandler} />
      )}
      {priceVisible && <PriceModal modal={modal} />}
    </>
  );
};

export default FilterButton;
