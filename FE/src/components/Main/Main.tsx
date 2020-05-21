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

  const FilterButtonWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
  `;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyleReset />
        <FilterButtonWrapper>
          <FilterButton></FilterButton>
          <FilterButton></FilterButton>
          <FilterButton></FilterButton>
        </FilterButtonWrapper>
        <Accommodation></Accommodation>
      </ThemeProvider>
    </>
  );
};

export default Main;
