import React from "react";
import styled from "styled-components";
import DatePicker from "@CalendarModal/Calendar/DatePicker";

const Wrapper = styled.div`
  position: absolute;
  top: 170px;
  width: 760px;
  height: 480px;
  padding: 50px 0 30px 0;
  background: white;
  border: solid 1px ${(props) => props.theme.subColor};
  border-radius: 10px;
  box-sizing: border-box;
`;

const CalendarModal = ({ closeClickHandler, modal }) => {
  return (
    <>
      <Wrapper>
        <DatePicker modal={modal} closeClickHandler={closeClickHandler} />
      </Wrapper>
    </>
  );
};

export default CalendarModal;
