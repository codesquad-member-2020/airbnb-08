import React from "react";
import styled from "styled-components";
import GuestCount from "@GuestCountModal/GuestCount/GuestCount";

const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 400px;
  top: 170px;
  left: 120px;
  background: white;
  border: solid 1px ${(props) => props.theme.subColor};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GuestCountModal = ({ modal }) => {
  return (
    <>
      <Modal>
        <GuestCount />
        <GuestCount />
        <GuestCount />
      </Modal>
    </>
  );
};

export default GuestCountModal;
