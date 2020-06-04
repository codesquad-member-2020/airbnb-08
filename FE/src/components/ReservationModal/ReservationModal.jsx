import React, { useEffect } from "react";
import styled from "styled-components";
import closeImage from "@/image/closeImage.png";
import arrowRight from "@/image/arrowRight.png";
import arrowBottom from "@/image/arrowBottom.png";
import questionImage from "@/image/questionImage.png";
import useFetch from "@/common/lib/useFetch";
import { API_URL } from "@/common/config";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReservationModalWrapper = styled.div`
  width: 450px;
  height: 650px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 430px;
  height: 630px;
  border: solid 1px #d8d8d8;
  padding: 27px;
  box-sizing: border-box;
  position: relative;
`;

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

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  top: 15px;
  right: 10px;
  position: absolute;
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
  width: 160px;
  height: 33px;
  line-height: 33px;
  padding-left: 15px;
`;

const ArrowIcon = styled.img`
  width: 35px;
  height: 20px;
`;

const ArrowButton = styled.img`
  width: 15px;
  margin: 0 10px;
`;

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

const ReservationButton = styled.button`
  background: ${({ theme }) => theme.pointColor};
  width: 100%;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-weight: bold;
  border: 0;
  outline: 0;
  margin-top: 10px;
  &:hover {
    background: #f78181;
  }
`;

const Message = styled.div`
  font-size: 13px;
  color: #585858;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-top: 17px;
`;

const ReservationModal = ({ closeModal }) => {
  const {
    guestCountReducer: { adultCount, childrenCount, babyCount },
    datePickerReducer: { startDate, endDate },
  } = useSelector((state) => state);

  const params = {
    roomId: 1,
    checkInDate: moment(startDate).format("yyyy-MM-DD"),
    checkOutDate: moment(endDate).format("yyyy-MM-DD"),
    numberOfAdults: adultCount,
    numberOfKids: childrenCount,
    numberOfBabies: babyCount,
  };

  useEffect(() => {
    axios({ method: "get", url: API_URL.reservations, params: params })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <>
      <Wrapper>
        <ReservationModalWrapper>
          <ContentWrapper>
            <CloseButton onClick={closeModal}>
              <img style={{ width: "15px" }} src={closeImage} />
            </CloseButton>
            <AccommodationPrice>₩99,692</AccommodationPrice>
            <RatingReviewWrapper>
              <Rating>
                ★<span>4.65</span>
              </Rating>
              <ReviewCount>(후기 95개)</ReviewCount>
            </RatingReviewWrapper>
            <Line />
            <ReservationContentTitle>날짜</ReservationContentTitle>
            <ReservationContentWrapper>
              <ReservationContent>2020.11.23</ReservationContent>
              <ArrowIcon src={arrowRight} />
              <ReservationContent>2020.11.24</ReservationContent>
            </ReservationContentWrapper>
            <ReservationContentTitle>인원</ReservationContentTitle>
            <ReservationContentWrapper style={{ justifyContent: "space-between" }}>
              <ReservationContent>게스트 4명</ReservationContent>
              <ArrowButton src={arrowBottom} />
            </ReservationContentWrapper>

            <PriceInfoWrapper>
              <PriceInfo>
                ₩99,692 X 14박
                <QuestionImage src={questionImage} />
              </PriceInfo>
              <PriceInfo>₩1,395,682</PriceInfo>
            </PriceInfoWrapper>
            <PriceInfoWrapper>
              <PriceInfo>
                청소비
                <QuestionImage src={questionImage} />
              </PriceInfo>
              <PriceInfo>₩34,208</PriceInfo>
            </PriceInfoWrapper>
            <PriceInfoWrapper>
              <PriceInfo>
                서비스 수수료
                <QuestionImage src={questionImage} />
              </PriceInfo>
              <PriceInfo>₩202,511</PriceInfo>
            </PriceInfoWrapper>
            <PriceInfoWrapper>
              <PriceInfo>
                숙박세와 수수료
                <QuestionImage src={questionImage} />
              </PriceInfo>
              <PriceInfo>₩61,410</PriceInfo>
            </PriceInfoWrapper>
            <PriceInfoWrapper style={{ fontWeight: "bold", border: "none" }}>
              <PriceInfo>합계</PriceInfo>
              <PriceInfo>₩1,693,811</PriceInfo>
            </PriceInfoWrapper>

            <ReservationButton>예약하기</ReservationButton>
            <Message>예약 확정 전에는 요금이 청구되지 않습니다</Message>
          </ContentWrapper>
        </ReservationModalWrapper>
      </Wrapper>
    </>
  );
};

export default ReservationModal;
