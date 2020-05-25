import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 460px;
  border-top: 1px solid ${(props) => props.theme.subColor};
  margin-top: 10px;
  padding: 20px;
`;

const DeleteButton = styled.button`
  outline: 0;
  border: 0;
  background: white;
  font-weight: bold;
  text-decoration: underline;
  font-size: ${(props) => props.theme.large};
  &:hover {
    color: ${(props) => props.theme.subColor};
  }
`;

const SaveButton = styled.button`
  outline: 0;
  border: 0;
  background: ${(props) => props.theme.mainColor};
  color: white;
  font-size: ${(props) => props.theme.large};
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  &:hover {
    background: ${(props) => props.theme.subColor};
  }
`;

const ModalButtons = () => {
  return (
    <Wrapper>
      <DeleteButton>지우기</DeleteButton>
      <SaveButton>저장</SaveButton>
    </Wrapper>
  );
};

export default ModalButtons;
