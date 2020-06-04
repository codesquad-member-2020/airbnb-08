import React from "react";
import styled from "styled-components";

import questionImage from "@/image/questionImage.png";

const PriceInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
  border-bottom: solid 1px #d8d8d8;
`;

const PriceInfo = styled.div`
  font-size: 16px;
  height: 39px;
  line-height: 39px;
  color: #585858;
`;

const QuestionImage = styled.img`
  width: 15px;
  margin: 0 5px;
`;

const BillInfo = ({
  roomData: {
    bill: { salesPrice, lengthOfStay, cleaningFee, securityDeposit, priceWithoutFee },
  },
}) => {
  const totalFee = salesPrice * lengthOfStay + cleaningFee + securityDeposit + priceWithoutFee;

  return (
    <>
      <PriceInfoWrapper>
        <PriceInfo>
          ₩{salesPrice} X {lengthOfStay}박
          <QuestionImage src={questionImage} />
        </PriceInfo>
        <PriceInfo>₩{salesPrice * lengthOfStay}</PriceInfo>
      </PriceInfoWrapper>
      <PriceInfoWrapper>
        <PriceInfo>
          청소비
          <QuestionImage src={questionImage} />
        </PriceInfo>
        <PriceInfo>₩{cleaningFee}</PriceInfo>
      </PriceInfoWrapper>
      <PriceInfoWrapper>
        <PriceInfo>
          서비스 수수료
          <QuestionImage src={questionImage} />
        </PriceInfo>
        <PriceInfo>₩{securityDeposit}</PriceInfo>
      </PriceInfoWrapper>
      <PriceInfoWrapper>
        <PriceInfo>
          숙박세와 수수료
          <QuestionImage src={questionImage} />
        </PriceInfo>
        <PriceInfo>₩{priceWithoutFee}</PriceInfo>
      </PriceInfoWrapper>
      <PriceInfoWrapper style={{ fontWeight: "bold", border: "none" }}>
        <PriceInfo>합계</PriceInfo>
        <PriceInfo>₩{totalFee}</PriceInfo>
      </PriceInfoWrapper>
    </>
  );
};

export default BillInfo;
