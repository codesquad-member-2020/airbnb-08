import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 400px;
  border: 1px solid red;
`;

const GuestCountModal = ({ modal }) => {
  return <Wrapper>{modal}</Wrapper>;
};

export default GuestCountModal;
