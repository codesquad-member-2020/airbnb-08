import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import Header from "@/components/Header/Header";
import Accommodation from "@/components/Main/Accommodation/Accommodation";
import FilterButton from "@/components/Main/FilterButton/FilterButton";
import theme from "@/style/theme";

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
  color: ${(props) => props.theme.mainColor};
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
          <ResultTitle>300개 이상의 숙소</ResultTitle>
          <AccommodationWrapper>
            <Accommodation></Accommodation>
            <Accommodation></Accommodation>
            <Accommodation></Accommodation>
            <Accommodation></Accommodation>
          </AccommodationWrapper>
        </ThemeProvider>
      </Wrapper>
    </>
  );
};

export default Main;
