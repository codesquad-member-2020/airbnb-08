import React from "react";
import styled from "styled-components";
import GuestCountModal from "@GuestCountModal/GuestCountModal";
import CalendarModal from "@CalendarModal/CalendarModal";
import PriceModal from "@PriceModal/PriceModal";

const Wrapper = styled.button`
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
  return (
    <>
      <Wrapper
        onClick={() => {
          filterButtonClickHandler(modal);
        }}
      >
        게스트 4명
      </Wrapper>
      {dateVisible && <GuestCountModal modal={modal} />}
      {guestVisible && <CalendarModal modal={modal} />}
      {priceVisible && <PriceModal modal={modal} />}
    </>
  );
};

export default FilterButton;
