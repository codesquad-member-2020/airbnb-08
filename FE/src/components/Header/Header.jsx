import React, { useState } from "react";
import styled from "styled-components";
import { API_URL } from "@/common/config";
import logo from "@/image/airbnbLogo.png";
import menuLogo from "@/image/menuLogo.png";

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

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 20px;
  border-radius: 15px;
  padding: 0 3px;
  margin-left: 3px;
  font-size: 13px;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
`;

const UserId = styled.span`
  margin: 0 7px;
`;

const UserImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 30px;
`;

const Header = () => {
  const [isLogin, setLogin] = useState(false);

  const loginClickHandler = () => {
    setLogin(true);
  };

  const logoutClickandler = () => {
    setLogin(false);
  };

  return (
    <>
      <Wrapper>
        <Logo src={logo} />
        <MenuWrapper>
          <MenuContent>
            <MenuIcon>
              <MenuImg src={menuLogo} />
              <MenuIconBtn>∨</MenuIconBtn>
            </MenuIcon>
          </MenuContent>
          <MenuContent>숙소 호스트 되기</MenuContent>
          <MenuContent>체험 호스팅하기</MenuContent>
          <MenuContent>도움말</MenuContent>

          {isLogin ? (
            <UserWrapper onClick={logoutClickandler}>
              <UserId>라라ㅏ랄</UserId>
              <UserImage src="https://a0.muscache.com/im/pictures/5282025/91fcaf72_original.jpg?aki_policy=large" />
            </UserWrapper>
          ) : (
            <>
              <MenuContent onClick={loginClickHandler}>로그인</MenuContent>
              <MenuContent>회원가입</MenuContent>
            </>
          )}
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default Header;
