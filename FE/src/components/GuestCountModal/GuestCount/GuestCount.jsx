import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "@/actions/guestCountAction";
import { guestCountConstant } from "@/common/constants/guestCountConstant";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 30px;
`;

const GuestTitleWrapper = styled.div`
  width: 30%;
`;

const Guest = styled.div`
  font-size: ${({ theme }) => theme.xlarge};
  margin-bottom: 15px;
`;

const Info = styled.div`
  font-size: ${({ theme }) => theme.large};
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  font-size: ${({ theme }) => theme.xlarge};
  font-weight: bold;
  line-height: 10px;
  border: 1px solid ${({ theme }) => theme.subColor};
  color: ${({ theme }) => theme.subColor};
  outline: 0;
  background: white;
  :disabled,
  :disabled:hover {
    color: #e6e6e6;
    border: solid 1px #e6e6e6;
  }
  &:hover {
    color: ${({ theme }) => theme.mainColor};
    border: solid 1px ${({ theme }) => theme.mainColor};
  }
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.xlarge};
  margin: 0 20px;
`;

const GuestCount = ({ ageType }) => {
  const dispatch = useDispatch();
  const { guestCountReducer } = useSelector((state) => state);
  const currentCount = guestCountReducer[`${ageType}Count`];
  const { title, info } = guestCountConstant[ageType];

  const incrementCountHandler = (ageType) => {
    const actionObj = actions.incrementCount(ageType);
    dispatch(actionObj);
  };

  const decrementCountHandler = (ageType) => {
    const actionObj = actions.decrementCount(ageType);
    dispatch(actionObj);
  };

  return (
    <Wrapper>
      <GuestTitleWrapper>
        <Guest>{title}</Guest>
        <Info>{info}</Info>
      </GuestTitleWrapper>
      <CountWrapper>
        <CounterButton
          disabled={guestCountReducer[`${ageType}Min`]}
          onClick={() => {
            decrementCountHandler(ageType);
          }}
        >
          -
        </CounterButton>
        <Count>{currentCount}</Count>
        <CounterButton
          disabled={guestCountReducer[`${ageType}Max`]}
          onClick={() => {
            incrementCountHandler(ageType);
          }}
        >
          +
        </CounterButton>
      </CountWrapper>
    </Wrapper>
  );
};

export default GuestCount;
