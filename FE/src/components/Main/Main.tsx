import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import Header from "@/components/Header/Header";
import Accommodation from "@Main/Accommodation/Accommodation";
import FilterButton from "@Main/FilterButton/FilterButton";
import theme from "@/style/theme";

const Main = () => {
  const StyleReset = createGlobalStyle`
    ${reset};
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

  return (
    <>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <StyleReset />
          <Header />
          <FilterButtonWrapper>
            <FilterButton></FilterButton>
            <FilterButton></FilterButton>
            <FilterButton></FilterButton>
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
