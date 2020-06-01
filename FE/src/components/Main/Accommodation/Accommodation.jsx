import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 400px;
  box-sizing: border-box;
  padding: 10px;
`;

const RoomImage = styled.img`
  width: 380px;
  box-sizing: border-box;
`;

const RoomInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const BadgeCountryWrapper = styled.div`
  display: flex;
`;

const Badge = styled.div`
  color: ${({ theme }) => theme.mainColor};
  border: solid 1px ${({ theme }) => theme.mainColor};
  border-radius: 3px;
  padding: 3px;
  font-size: ${({ theme }) => theme.small};
  height: ${({ theme }) => theme.medium};
  line-height: ${({ theme }) => theme.medium};
  font-weight: bold;
`;

const Country = styled.div`
  color: ${({ theme }) => theme.subColor};
  font-size: ${({ theme }) => theme.medium};
  margin: 0 10px;
  padding: 3px;
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.pointColor};
  span {
    color: ${({ theme }) => theme.mainColor};
  }
`;

const Title = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.large};
  margin-bottom: 10px;
`;

const PriceWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  font-weight: bold;
  margin-right: 5px;
  color: ${({ theme }) => theme.subColor};
`;

const Price = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.large};
  ::after {
    content: "/1박";
    font-weight: normal;
  }
`;

const PriceReservationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled.div`
  font-size: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.subColor};
`;

const ReservationButton = styled.button`
  color: white;
  font-size: ${({ theme }) => theme.large};
  font-weight: bold;
  padding: 5px;
  background: ${({ theme }) => theme.pointColor};
  width: 80px;
  border: 0;
  outline: 0;
  border-radius: 5px;
`;

const Accommodation = ({ roomData }) => {
  console.log(roomData);
  const {
    badge,
    country,
    medias,
    price: { originPrice, salesPrice, totalPrice },
    reviewScoresRating,
    roomName,
    roomId,
  } = roomData;
  return (
    <>
      <Wrapper>
        <RoomImage src={medias[0]} />
        <RoomInfoWrapper>
          <BadgeCountryWrapper>
            {badge === "" ? "" : <Badge>{badge}</Badge>}
            <Country>{country}</Country>
          </BadgeCountryWrapper>
          <Rating>
            ★ <span>{reviewScoresRating}</span>
          </Rating>
        </RoomInfoWrapper>
        <Title>{roomName}</Title>
        <PriceWrapper>
          <OriginalPrice>￦{originPrice}</OriginalPrice>
          <Price>￦{salesPrice}</Price>
        </PriceWrapper>
        <PriceReservationWrapper>
          <TotalPrice>총 요금 : ￦{totalPrice}(?)</TotalPrice>
          <ReservationButton>예약</ReservationButton>
        </PriceReservationWrapper>
      </Wrapper>
    </>
  );
};

export default Accommodation;
