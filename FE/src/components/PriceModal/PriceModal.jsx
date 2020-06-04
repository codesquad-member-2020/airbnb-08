import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import PriceRangeChart from "@PriceModal/PriceRangeChart/PriceRangeChart";
import SelectedRange from "@PriceModal/SelectedRange/SelectedRange";
import ModalButtons from "@/components/ModalButtons";

import useApiFetch from "@/common/lib/useApiFetch";
import { API_URL } from "@/common/config";
import { deletePriceRange } from "@/actions/priceRangeAction";

const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 370px;
  top: 55px;
  left: 5px;
  background: white;
  border: solid 1px ${({ theme }) => theme.subColor};
  border-radius: 10px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceModal = ({ closeClickHandler }) => {
  const {
    datePickerReducer: { startDate, endDate },
  } = useSelector((state) => state);

  const start = moment(startDate).format("yyyy-MM-DD");
  const end = moment(endDate).format("yyyy-MM-DD");

  const dispatch = useDispatch();

  const deleteClickHandler = () => {
    dispatch(deletePriceRange());
  };

  const [loading, response, error] = useApiFetch(API_URL.budget, "get", {
    checkInDate: start,
    checkOutDate: end,
  });

  if (!response) return null;

  return (
    <Modal>
      <PriceRangeChart priceData={response} />
      <SelectedRange />
      <ModalButtons
        deleteClickHandler={deleteClickHandler}
        closeClickHandler={closeClickHandler}
      ></ModalButtons>
    </Modal>
  );
};

export default PriceModal;
