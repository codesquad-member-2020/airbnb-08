import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import Accommodation from "@Main/Accommodation/Accommodation";
import FilterButton from "@Main/FilterButton/FilterButton";
import theme from "@/style/theme";

const Main = () => {
  const StyleReset = createGlobalStyle`
    ${reset};
  `;

  const Wrapper = styled.div`
    border: solid 1px red;
    width: 1200px;
    margin: auto;
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
          <FilterButtonWrapper>
            <FilterButton></FilterButton>
            <FilterButton></FilterButton>
            <FilterButton></FilterButton>
          </FilterButtonWrapper>
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
