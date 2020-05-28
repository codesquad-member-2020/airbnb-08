import React from "react";
import styled from "styled-components";
import PriceRangeChart from "@PriceModal/PriceRangeChart/PriceRangeChart";
import SelectedRange from "@PriceModal/SelectedRange/SelectedRange";

const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 450px;
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

const PriceModal = () => {
  return (
    <Modal>
      <PriceRangeChart></PriceRangeChart>
      <SelectedRange></SelectedRange>
    </Modal>
  );
};

export default PriceModal;
