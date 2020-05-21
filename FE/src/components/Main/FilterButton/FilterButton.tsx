import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 20px;
  padding: 10px 15px;
  margin: 10px 5px;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px ${(props) => props.theme.subColor};
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.mainColor};
  }
`;

const FilterButton = () => {
  return (
    <>
      <Wrapper>게스트 4명</Wrapper>
    </>
  );
};

export default FilterButton;
