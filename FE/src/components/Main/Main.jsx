import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import Header from "@/components/Header/Header";
import Accommodation from "@/components/Main/Accommodation/Accommodation";
import FilterButton from "@/components/Main/FilterButton/FilterButton";
import theme from "@/style/theme";
import useFetch from "@/common/lib/useFetch";
import useIntersect from "@/common/lib/useIntersect";
import { API_URL } from "@/common/config";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { search } from "@/actions/searchAction";

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

  const [state, setState] = useState({ itemCount: 0, isLoading: false });

  const {
    guestCountReducer: { adultCount, childrenCount, babyCount },
    datePickerReducer: { startDate, endDate },
    priceRangeReducer: { priceRange, isSaved, isDeleted },
    searchReducer: { isSearched },
  } = useSelector((state) => state);

  let fetchData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSearched === false) return;
    searchFetch();
    dispatch(search(false));
  }, [isSearched]);
  const searchFetch = () => {
    axios({
      method: "get",
      url: API_URL.main,
      params: {
        checkInDate: moment(startDate).format("yyyy-MM-DD"),
        checkOutDate: moment(endDate).format("yyyy-MM-DD"),

        numberOfAdults: adultCount,
        numberOfKids: childrenCount,
        numberOfBabies: babyCount,

        lowestPrice: priceRange[0],
        highestPrice: priceRange[1],
      },
    })
      .then((response) => {
        // console.log(response.data);
        fetchData = response.data;
        console.log(fetchData);
      })
      .catch((e) => setError(e));
  };
  const [loading, response, error] = useFetch(API_URL.main, "get", {
    reservationDate: {
      checkInDate: moment(startDate).format("yyyy-MM-DD"),
      checkOutDate: moment(endDate).format("yyyy-MM-DD"),
    },
    guest: {
      numberOfAdults: adultCount,
      numberOfKids: childrenCount,
      numberOfBabies: babyCount,
    },
    budget: {
      lowestPrice: priceRange[0],
      highestPrice: priceRange[1],
    },
  });

  const fakeFetch = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 9,
      isLoading: false,
    }));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  const { itemCount, isLoading } = state;
  if (!itemCount) return null;

  if (loading) {
    return <div>loading...</div>;
  }

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
          <ResultTitle>{}개의 숙소</ResultTitle>
          <AccommodationWrapper>
            {data.rooms.slice(0, itemCount).map((list) => (
              <Accommodation roomData={list} key={list.roomdId} />
            ))}
            <div ref={setRef} className="Loading">
              {isLoading && <Wrapper style={{ height: "400px" }}>Loading...</Wrapper>}
            </div>
          </AccommodationWrapper>
        </ThemeProvider>
      </Wrapper>
    </>
  );
};

export default Main;
