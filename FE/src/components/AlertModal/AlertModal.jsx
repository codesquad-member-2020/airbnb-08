import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const AlertWrapper = styled.div`
  background: white;
  border: solid 1px ${({ theme }) => theme.subColor};
  border-radius: 10px;
  margin: auto;
  padding: 40px;
  width: 500px;
  height: 130px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.xlarge};
  font-weight: bold;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.large};
  margin: 30px 0 20px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const Button = styled.button`
  outline: 0;
  border: 0;
  background: ${({ theme }) => theme.mainColor};
  color: white;
  font-size: ${({ theme }) => theme.large};
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  &:hover {
    background: ${({ theme }) => theme.subColor};
  }
`;

const AlertModal = ({ message }) => {
  return (
    <Modal>
      <AlertWrapper>
        <Title>경고</Title>
        <Message>{message}</Message>
        <ButtonWrapper>
          <Button>확인</Button>
        </ButtonWrapper>
      </AlertWrapper>
    </Modal>
  );
};

export default AlertModal;
