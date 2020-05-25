import React from "react";
import styled from "styled-components";

const Header = () => {
  const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  `;
  const Logo = styled.img`
    width: 130px;
  `;

  const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
  `;

  const MenuIcon = styled.div`
    display: flex;
  `;

  const MenuImg = styled.img`
    width: 20px;
    height: 20px;
  `;
  const MenuIconBtn = styled.div`
    font-size: 13px;
    font-weight: bold;
    margin-left: 5px;
  `;

  const MenuContent = styled.div`
    padding: 10px 15px;
    height: 40px;
    line-height: 20px;
    border-radius: 15px;
    margin-left: 3px;
    font-size: 13px;
    font-weight: bold;
    box-sizing: border-box;
    &:hover {
      background: #f2f2f2;
    }
  `;

  return (
    <>
      <Wrapper>
        <Logo src="https://t1.daumcdn.net/cfile/tistory/99CA8E3359CF022A03" />
        <MenuWrapper>
          <MenuContent>
            <MenuIcon>
              <MenuImg src="https://cdn.icon-icons.com/icons2/1790/PNG/512/global1_114607.png" />
              <MenuIconBtn>∨</MenuIconBtn>
            </MenuIcon>
          </MenuContent>
          <MenuContent>숙소 호스트 되기</MenuContent>
          <MenuContent>체험 호스팅하기</MenuContent>
          <MenuContent>도움말</MenuContent>
          <MenuContent>로그인</MenuContent>
          <MenuContent>회원가입</MenuContent>
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default Header;
