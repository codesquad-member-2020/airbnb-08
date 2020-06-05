import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";

import arrowRight from "@/image/arrowRight.png";
import arrowBottom from "@/image/arrowBottom.png";

const AccommodationPrice = styled.div`
  font-size: ${({ theme }) => theme.xlarge};
  font-weight: bold;
  color: ${({ theme }) => theme.mainColor};
  ::after {
    content: " /박";
    font-size: ${({ theme }) => theme.medium};
    font-weight: normal;
  }
`;

const RatingReviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 20px;
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.pointColor};
  font-size: ${({ theme }) => theme.large};
  font-weight: bold;

  span {
    color: ${({ theme }) => theme.mainColor};
    font-size: ${({ theme }) => theme.medium};
  }
`;

const ReviewCount = styled.div`
  color: ${({ theme }) => theme.subColor};
  font-size: ${({ theme }) => theme.medium};
  margin-left: 5px;
  height: 18px;
  line-height: 20px;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: solid 1px #d8d8d8;
  margin: 20px 0px;
`;

const ReservationContentTitle = styled.div`
  color: ${({ theme }) => theme.mainColor};
`;

const ReservationContentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  height: 45px;
  box-sizing: border-box;
  padding: 7px;
  border: solid 1px #d8d8d8;
  align-items: center;
`;

const ReservationContent = styled.div`
  font-size: 18px;
  height: 33px;
  line-height: 33px;
  padding: 0 15px;
`;

const ArrowIcon = styled.img`
  width: 35px;
  height: 20px;
`;

const ArrowButton = styled.img`
  width: 15px;
  margin: 0 10px;
`;

const SelectedInfo = ({
  roomData: {
    bill: { priceWithFee },
    review: { reviewScoreRating, numberOfReviews },
  },
}) => {
  const {
    guestCountReducer: { totalCount, babyCount },
    datePickerReducer: { startDate, endDate },
  } = useSelector((state) => state);

  const start = moment(startDate).format("yyyy-MM-DD");
  const end = moment(endDate).format("yyyy-MM-DD");

  const guestMessage = babyCount
    ? `게스트 ${totalCount}명, 유아 ${babyCount}명`
    : `게스트 ${totalCount}명`;

  return (
    <>
      <AccommodationPrice>₩{priceWithFee}</AccommodationPrice>
      <RatingReviewWrapper>
        <Rating>
          ★<span>{reviewScoreRating}</span>
        </Rating>
        <ReviewCount>(후기 {numberOfReviews}개)</ReviewCount>
      </RatingReviewWrapper>
      <Line />
      <ReservationContentTitle>날짜</ReservationContentTitle>
      <ReservationContentWrapper>
        <ReservationContent>{start}</ReservationContent>
        <ArrowIcon src={arrowRight} />
        <ReservationContent>{end}</ReservationContent>
      </ReservationContentWrapper>
      <ReservationContentTitle>인원</ReservationContentTitle>
      <ReservationContentWrapper style={{ justifyContent: "space-between" }}>
        <ReservationContent>{guestMessage}</ReservationContent>
        <ArrowButton src={arrowBottom} />
      </ReservationContentWrapper>
    </>
  );
};

export default SelectedInfo;
