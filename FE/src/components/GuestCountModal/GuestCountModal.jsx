import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 400px;
  top: 17%;
  left: 25%;
  background: white;
  border: solid 1px ${(props) => props.theme.subColor};
  border-radius: 10px;
`;

const GuestCountModal = ({ modal }) => {
  return (
    <Wrapper>
      <Modal></Modal>
    </Wrapper>
  );
};

export default GuestCountModal;
