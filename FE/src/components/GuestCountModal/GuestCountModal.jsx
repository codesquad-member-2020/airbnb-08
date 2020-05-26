import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "@/actions/actions";
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

const GuestCountModal = ({ closeClickHandler, modal }) => {
  const dispatch = useDispatch();

  const deleteClickHandler = () => {
    const actionObj = actions.deleteCount();
    dispatch(actionObj);
  };

  return (
    <>
      <Modal>
        <GuestCount ageType="adult" />
        <GuestCount ageType="children" />
        <GuestCount ageType="baby" />
        <ModalButtons
          deleteClickHandler={deleteClickHandler}
          closeClickHandler={closeClickHandler}
          modal={modal}
        />
      </Modal>
    </>
  );
};

export default GuestCountModal;
