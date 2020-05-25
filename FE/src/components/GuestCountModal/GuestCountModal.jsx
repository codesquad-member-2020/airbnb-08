import React from "react";
import styled from "styled-components";
import GuestCount from "@GuestCountModal/GuestCount/GuestCount";
import ModalButtons from "@/components/ModalButtons";

const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 350px;
  top: 170px;
  left: 120px;
  background: white;
  border: solid 1px ${(props) => props.theme.subColor};
  border-radius: 10px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GuestCountModal = ({ modal }) => {
  return (
    <>
      <Modal>
        <GuestCount ageType="adult" />
        <GuestCount ageType="children" />
        <GuestCount ageType="baby" />
        <ModalButtons />
      </Modal>
    </>
  );
};

export default GuestCountModal;
