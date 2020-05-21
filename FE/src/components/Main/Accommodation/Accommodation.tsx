import React from "react";
import styled from "styled-components";
import img from "@/test.png";

const Accommodation = () => {
  const Wrapper = styled.div``;

  const RoomImage = styled.img``;

  const RoomInfoWrapper = styled.div``;

  const BadgeCountryWrapper = styled.div``;

  const Badge = styled.div``;

  const Country = styled.div``;

  const Rating = styled.div``;

  const Title = styled.div``;

  const PriceWrapper = styled.div``;

  const OriginalPrice = styled.div``;

  const Price = styled.div`
    ::after {
      content: "/1박";
    }
  `;

  const PriceReservationWrapper = styled.div``;

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
          <Rating>★ 4.89</Rating>
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
