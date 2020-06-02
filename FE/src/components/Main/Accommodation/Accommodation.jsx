import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import placeholder from "@/image/placeholder.png";

const Wrapper = styled.div`
  width: 400px;
  height: 454px;
  box-sizing: border-box;
  padding: 10px;
`;

const shine = keyframes`
  to {
    background-position:
      100% 0,
      200px 0;
  }
`;

const RoomImage = styled.img`
  width: 380px;
  height: 300px;
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
  &:empty {
    height: 21px;
    width: 130px;
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      linear-gradient(#eeeeee 20px, transparent 0);
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
`;

const Badge = styled.div`
  color: ${({ theme }) => theme.mainColor};
  border: solid 1px ${({ theme }) => theme.mainColor};
  border-radius: 3px;
  padding: 3px;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.small};
  height: ${({ theme }) => theme.medium};
  line-height: ${({ theme }) => theme.medium};
  font-weight: bold;
`;

const Country = styled.div`
  color: ${({ theme }) => theme.subColor};
  font-size: ${({ theme }) => theme.medium};
  padding: 3px 0px;
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.pointColor};
  span {
    color: ${({ theme }) => theme.mainColor};
  }
  &:empty {
    width: 55px;
    height: 21px;
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      linear-gradient(#eeeeee 20px, transparent 0);
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.large};
  margin-bottom: 10px;
  &:empty {
    height: 18px;
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      linear-gradient(#eeeeee 20px, transparent 0);
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  &:empty {
    height: 18px;
    width: 190px;
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: 
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
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
  &:empty {
    height: 17px;
    width: 150px;
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      linear-gradient(#eeeeee 20px, transparent 0);
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
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
  &:empty {
    height: 32px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    );
    background-size: 200px 70px;
    background-position: 0 0;
    animation: ${shine} 1s infinite;
  }
`;

const Accommodation = ({ roomData }) => {
  const imgRef = useRef(null);
  const observerRef = useRef();
  const [isLoad, setIsLoad] = useState(false);

  const onIntersection = (entries, io) => {
    let count = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(++count);
        io.unobserve(entry.target);
        setIsLoad(true);
      }
    });
  };

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection, {
        root: null,
        threshold: 1,
      });
    }

    imgRef.current && observerRef.current.observe(imgRef.current);
  }, []);

  const {
    badge,
    country,
    medias,
    price: { originPrice, salesPrice, totalPrice },
    reviewScoresRating,
    roomName,
    roomdId,
  } = roomData;

  return (
    <>
      <Wrapper ref={imgRef}>
        {isLoad ? (
          <>
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
              {originPrice === salesPrice ? "" : <OriginalPrice>￦{originPrice}</OriginalPrice>}

              <Price>￦{salesPrice}</Price>
            </PriceWrapper>
            <PriceReservationWrapper>
              <TotalPrice>총 요금 : ￦{totalPrice}(?)</TotalPrice>
              <ReservationButton>예약</ReservationButton>
            </PriceReservationWrapper>
          </>
        ) : (
          <>
            <RoomImage src={placeholder} />
            <RoomInfoWrapper>
              <BadgeCountryWrapper />
              <Rating />
            </RoomInfoWrapper>
            <Title />
            <PriceWrapper />
            <PriceReservationWrapper>
              <TotalPrice />
              <ReservationButton />
            </PriceReservationWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Accommodation;
