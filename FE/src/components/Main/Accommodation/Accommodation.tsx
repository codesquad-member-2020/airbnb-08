import React from "react";
import styled from "styled-components";
import img from "@/test.png";

const Accommodation = () => {
  const Wrapper = styled.div`
    width: 400px;
    box-sizing: border-box;
    border: 1px solid blue;
    padding: 10px;
  `;

  const RoomImage = styled.img`
    width: 380px;
    box-sizing: border-box;
    border: 1px solid blue;
  `;

  const RoomInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const BadgeCountryWrapper = styled.div`
    display: flex;
  `;

  const Badge = styled.div`
    color: ${(props) => props.theme.mainColor};
    border: solid 1px ${(props) => props.theme.mainColor};
    border-radius: 3px;
    padding: 3px;
    font-size: 10px;
    height: 10px;
    line-height: 10px;
  `;

  const Country = styled.div`
    color: ${(props) => props.theme.subColor};
    font-size: 15px;
    margin: 0 10px;
    padding: 3px;
  `;

  const Rating = styled.div`
    color: ${(props) => props.theme.pointColor};
    span {
      color: ${(props) => props.theme.mainColor};
    }
  `;

  const Title = styled.div``;

  const PriceWrapper = styled.div`
    display: flex;
  `;

  const OriginalPrice = styled.div``;

  const Price = styled.div`
    ::after {
      content: "/1박";
    }
  `;

  const PriceReservationWrapper = styled.div`
    display: flex;
  `;

  const TotalPrice = styled.div``;

  const ReservationButton = styled.button``;

  return (
    <>
      <Wrapper>
        <RoomImage src={img} />
        <RoomInfoWrapper>
          <BadgeCountryWrapper>
            <Badge>슈퍼호스트</Badge>
            <Country>프랑스</Country>
          </BadgeCountryWrapper>
          <Rating>
            ★ <span>4.89</span>
          </Rating>
        </RoomInfoWrapper>
        <Title>CHARMING HOUSE SEASIDE</Title>
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
