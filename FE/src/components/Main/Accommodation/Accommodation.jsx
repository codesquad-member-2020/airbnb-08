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

const Accommodation = () => {
  return (
    <>
      <Wrapper>
        <RoomImage src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=697%2C465" />
        <RoomInfoWrapper>
          <BadgeCountryWrapper>
            <Badge>슈퍼호스트</Badge>
            <Country>프랑스</Country>
          </BadgeCountryWrapper>
          <Rating>
            ★ <span>4.89</span>
          </Rating>
        </RoomInfoWrapper>
        <Title>CHARMING HOUSE SEASIDE CHARMING HOUSE SEASIDE CHARMING HOUSE SEASIDE</Title>
        <PriceWrapper>
          <OriginalPrice>￦271,287</OriginalPrice>
          <Price>￦239,816</Price>
        </PriceWrapper>
        <PriceReservationWrapper>
          <TotalPrice>총 요금 : ￦3,357,426(?)</TotalPrice>
          <ReservationButton>예약</ReservationButton>
        </PriceReservationWrapper>
      </Wrapper>
    </>
  );
};

export default Accommodation;
