import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { useSelector } from "react-redux";
import moment from "moment";

import Header from "@/components/Header/Header";
import Accommodation from "@/components/Main/Accommodation/Accommodation";
import FilterButton from "@/components/Main/FilterButton/FilterButton";
import AlertModal from "@AlertModal/AlertModal";

import theme from "@/style/theme";
import useFetch from "@/common/lib/useFetch";
import useIntersect from "@/common/lib/useIntersect";
import { API_URL } from "@/common/config";

const StyleReset = createGlobalStyle`
  ${reset};
  button {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 1200px;
  margin: auto;
`;

const ResultTitle = styled.div`
  margin: 40px 0px 10px 10px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.mainColor};
`;

const FilterButtonWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const AccommodationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Main = () => {
  const [dateVisible, setDateVisible] = useState(false);
  const [guestVisible, setGuestVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [itemCount, setItemCount] = useState(0);

  const {
    guestCountReducer: { adultCount, childrenCount, babyCount },
    datePickerReducer: { startDate, endDate },
    priceRangeReducer: { priceRange },
    searchReducer: { isSearched },
  } = useSelector((state) => state);

  const searchParams = isSearched
    ? {
        checkInDate: moment(startDate).format("yyyy-MM-DD"),
        checkOutDate: moment(endDate).format("yyyy-MM-DD"),
        numberOfAdults: adultCount,
        numberOfKids: childrenCount,
        numberOfBabies: babyCount,
        lowestPrice: priceRange[0],
        highestPrice: priceRange[1],
      }
    : null;

  const [loading, response, error] = useFetch(API_URL.main, "get", searchParams);

  const fetchItems = async () => {
    setItemCount((prev) => prev + 9);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  if (!itemCount) return null;

  if (!response) return null;

  if (error) {
    return <div>error!</div>;
  }

  const data = response;

  const filterButtonClickHandler = (modal) => {
    switch (modal) {
      case "date":
        setDateVisible(!dateVisible);
        setGuestVisible(false);
        setPriceVisible(false);
        break;
      case "guest":
        setGuestVisible(!guestVisible);
        setDateVisible(false);
        setPriceVisible(false);
        break;
      case "price":
        if (!startDate || !endDate) {
          setAlertVisible(!alertVisible);
          break;
        }
        setPriceVisible(!priceVisible);
        setDateVisible(false);
        setGuestVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <StyleReset />
          <Header />
          {alertVisible && <AlertModal message="날짜를 먼저 선택해 주세요!" />}
          <FilterButtonWrapper>
            <FilterButton
              filterButtonClickHandler={filterButtonClickHandler}
              dateVisible={dateVisible}
              modal="date"
            ></FilterButton>
            <FilterButton
              filterButtonClickHandler={filterButtonClickHandler}
              guestVisible={guestVisible}
              modal="guest"
            ></FilterButton>
            <FilterButton
              filterButtonClickHandler={filterButtonClickHandler}
              priceVisible={priceVisible}
              modal="price"
            ></FilterButton>
          </FilterButtonWrapper>
          <ResultTitle>{data.numberOfRooms}개의 숙소</ResultTitle>
          <AccommodationWrapper>
            {loading ? (
              <div>loading....</div>
            ) : (
              data.rooms
                .slice(0, itemCount)
                .map((list) => <Accommodation roomData={list} key={list.roomId} />)
            )}
            <div ref={setRef} />
          </AccommodationWrapper>
        </ThemeProvider>
      </Wrapper>
    </>
  );
};

export default Main;
