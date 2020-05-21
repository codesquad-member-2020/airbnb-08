import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Accommodation from "@Main/Accommodation/Accommodation";
import FilterButton from "@Main/FilterButton/FilterButton";

const Main = () => {
  const StyleReset = createGlobalStyle`
    ${reset};
  `;

  return (
    <>
      <StyleReset />
      <FilterButton></FilterButton>
      <Accommodation></Accommodation>
    </>
  );
};

export default Main;
