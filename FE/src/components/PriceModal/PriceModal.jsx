import React from "react";
import styled from "styled-components";
import PriceRangeChart from "@PriceModal/PriceRangeChart/PriceRangeChart";
import SelectedRange from "@PriceModal/SelectedRange/SelectedRange";
import ModalButtons from "@/components/ModalButtons";
import { useDispatch } from "react-redux";
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

const PriceModal = ({ closeClickHandler, priceData }) => {
  const dispatch = useDispatch();

  const deleteClickHandler = () => {
    dispatch(deletePriceRange());
  };

  return (
    <Modal>
      <PriceRangeChart priceData={priceData} />
      <SelectedRange />
      <ModalButtons
        deleteClickHandler={deleteClickHandler}
        closeClickHandler={closeClickHandler}
      ></ModalButtons>
    </Modal>
  );
};

export default PriceModal;
