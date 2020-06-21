import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import GuestCountModal from "@GuestCountModal/GuestCountModal";
import CalendarModal from "@CalendarModal/CalendarModal";
import PriceModal from "@PriceModal/PriceModal";
import AlertModal from "@AlertModal/AlertModal";

import { savePriceRange } from "@/actions/priceRangeAction";
import { search } from "@/actions/searchAction";
import { API_URL } from "@/common/config";
import { DATE_FIRST, DATE_NOT_NULL } from "@/common/constants/alertMessage";

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.div`
  border-radius: 20px;
  padding: 10px 15px;
  margin: 10px 5px;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.subColor};
  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.mainColor};
  }
`;

const FilterButton = ({
  filterButtonClickHandler,
  dateVisible,
  guestVisible,
  priceVisible,
  modal,
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const {
    guestCountReducer: { totalCount, babyCount },
    datePickerReducer: { startDate, endDate },
    priceRangeReducer: { priceRange, isSaved, isDeleted },
  } = useSelector((state) => state);

  const start = moment(startDate).format("yyyy-MM-DD");
  const end = moment(endDate).format("yyyy-MM-DD");

  const showResult = () => {
    switch (modal) {
      case "date":
        if (!startDate && !endDate) return "날짜";
        return start && !endDate ? `${start} - 체크아웃` : `${start} - ${end}`;
      case "guest":
        if (!totalCount && !babyCount) return "인원";
        return totalCount && !babyCount
          ? `게스트 ${totalCount}명`
          : `게스트 ${totalCount}명, 유아 ${babyCount}명`;
      case "price":
        if (!isSaved || isDeleted) return "요금";
        const maxPrice = priceRange[1] >= 1000000 ? "1000000+" : priceRange[1];
        return `₩${priceRange[0]} - ₩${maxPrice}`;
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const makeAlertModal = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const saveButtonClickHandler = () => {
    if (modal === "price") dispatch(savePriceRange());
    if (modal === "date") {
      if (!startDate || !endDate) {
        makeAlertModal(DATE_NOT_NULL);
        return;
      }
    }
    if (modal === "guest") {
      if (!startDate || !endDate) {
        makeAlertModal(DATE_FIRST);
        return;
      }
    }
    filterButtonClickHandler(modal);
    dispatch(search(true));
  };

  const alertCloseHandler = () => {
    setAlertVisible(!alertVisible);
  };

  return (
    <>
      {alertVisible && <AlertModal message={alertMessage} alertCloseHandler={alertCloseHandler} />}
      <Wrapper>
        <Button onClick={() => filterButtonClickHandler(modal)}>{showResult()}</Button>
        <CalendarModal
          dateVisible={dateVisible}
          modal={modal}
          closeClickHandler={saveButtonClickHandler}
        />
        {guestVisible && (
          <GuestCountModal modal={modal} closeClickHandler={saveButtonClickHandler} />
        )}
        {priceVisible && <PriceModal modal={modal} closeClickHandler={saveButtonClickHandler} />}
      </Wrapper>
    </>
  );
};

export default FilterButton;
