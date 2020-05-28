import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  border-top: 1px solid ${({ theme }) => theme.subColor};
  margin-top: 10px;
  align-items: center;
`;

const DeleteButton = styled.button`
  outline: 0;
  border: 0;
  background: white;
  font-weight: bold;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.large};
  margin-left: 20px;
  &:hover {
    color: ${({ theme }) => theme.subColor};
  }
`;

const SaveButton = styled.button`
  outline: 0;
  border: 0;
  background: ${({ theme }) => theme.mainColor};
  color: white;
  font-size: ${({ theme }) => theme.large};
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 20px;
  &:hover {
    background: ${({ theme }) => theme.subColor};
  }
`;

const ModalButtons = ({ deleteClickHandler, closeClickHandler, modal }) => {
  return (
    <Wrapper>
      <DeleteButton onClick={deleteClickHandler}>지우기</DeleteButton>
      <SaveButton
        onClick={() => {
          closeClickHandler(modal);
        }}
      >
        저장
      </SaveButton>
    </Wrapper>
  );
};

export default ModalButtons;
