import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "@/actions/actions";
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
  font-size: ${(props) => props.theme.xlarge};
  margin-bottom: 15px;
`;

const Info = styled.div`
  font-size: ${(props) => props.theme.large};
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
  font-size: ${(props) => props.theme.xlarge};
  font-weight: bold;
  line-height: 10px;
  border: 1px solid ${(props) => props.theme.subColor};
  color: ${(props) => props.theme.subColor};
  outline: 0;
  background: white;
  :disabled,
  :disabled:hover {
    color: #e6e6e6;
    border: solid 1px #e6e6e6;
  }
  &:hover {
    color: ${(props) => props.theme.mainColor};
    border: solid 1px ${(props) => props.theme.mainColor};
  }
`;

const Count = styled.span`
  font-size: ${(props) => props.theme.xlarge};
  margin: 0 20px;
`;

const GuestCount = ({ ageType }) => {
  const dispatch = useDispatch();
  const countState = useSelector((state) => state);
  const [isDisable, setIsDisable] = useState(false);

  const { title, info } = guestCountConstant[ageType];

  const incrementCountHandler = (ageType) => {
    const actionObj = actions[`${ageType}IncrementCount`]();
    dispatch(actionObj);
  };

  const decrementCountHandler = (ageType) => {
    const actionObj = actions[`${ageType}DecrementCount`]();
    dispatch(actionObj);
  };

  const blockButton = (limitNumber) => {
    const currentState = countState[`${ageType}Count`];
    if (currentState === limitNumber) {
      setIsDisable(true);
      return;
    } else {
      setIsDisable(false);
    }
  };

  return (
    <Wrapper>
      <GuestTitleWrapper>
        <Guest>{title}</Guest>
        <Info>{info}</Info>
      </GuestTitleWrapper>
      <CountWrapper>
        <CounterButton
          disabled
          onClick={() => {
            decrementCountHandler(ageType);
            blockButton(4);
          }}
        >
          -
        </CounterButton>
        <Count>{countState[`${ageType}Count`]}</Count>
        <CounterButton
          style={{ disabled: { isDisable } }}
          onClick={() => {
            incrementCountHandler(ageType);
            blockButton(8);
          }}
        >
          +
        </CounterButton>
      </CountWrapper>
    </Wrapper>
  );
};

export default GuestCount;
