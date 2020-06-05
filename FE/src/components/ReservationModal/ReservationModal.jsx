import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

import Reservation from "@ReservationModal/Reservation/Reservation";
import useApiFetch from "@/common/lib/useApiFetch";
import { API_URL } from "@/common/config";
import closeImage from "@/image/closeImage.png";

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

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  top: 15px;
  right: 10px;
  position: absolute;
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

const ReservationModal = ({ closeModal, roomId }) => {
  const {
    datePickerReducer: { startDate, endDate },
    guestCountReducer: { adultCount, childrenCount, babyCount },
  } = useSelector((state) => state);

  const params = {
    roomId: roomId,
    checkInDate: moment(startDate).format("yyyy-MM-DD"),
    checkOutDate: moment(endDate).format("yyyy-MM-DD"),
    numberOfAdults: adultCount,
    numberOfKids: childrenCount,
    numberOfBabies: babyCount,
  };

  const reservationConfirmClickHandler = () => {
    axios({ method: "post", url: API_URL.reservations, params: params }).then((response) => {
      console.log(response);
    });
  };

  const [loading, response, _] = useApiFetch(API_URL.reservations, "get", params);

  if (loading) return <div>로딩중입니다...</div>;

  if (!response) return null;

  console.log(response);
  return (
    <>
      <Wrapper>
        <ReservationModalWrapper>
          <ContentWrapper>
            <CloseButton value={null} onClick={closeModal}>
              <img style={{ width: "15px" }} src={closeImage} />
            </CloseButton>
            <Reservation roomData={response} />
            <ReservationButton onClick={reservationConfirmClickHandler}>예약하기</ReservationButton>
            <Message>예약 확정 전에는 요금이 청구되지 않습니다</Message>
          </ContentWrapper>
        </ReservationModalWrapper>
      </Wrapper>
    </>
  );
};

export default ReservationModal;
