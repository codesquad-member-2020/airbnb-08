import React, { useState } from "react";
import styled from "styled-components";
import { API_URL } from "@/common/config";
import logo from "@/image/airbnbLogo.png";
import menuLogo from "@/image/menuLogo.png";

import { setCookie, getCookie, deleteCookie } from "@/common/lib/cookies";

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
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
`;

const UserMenuWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 70px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 64px;
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
  &:hover ${UserMenuWrapper} {
    display: block;
  }
`;

const UserMenu = styled.div`
  display: block;
  padding: 15px 20px;
  &:hover {
    background: ${({ theme }) => theme.subColor};
  }
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
  const [isLogout, setIsLogout] = useState(false);

  const loginHandler = () => {
    window.location.href = API_URL.oauth;
  };

  const logoutHandler = () => {
    setIsLogout(true);
    deleteCookie("userImage");
    deleteCookie("userId");
    deleteCookie("jwt");
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
          {document.cookie && !isLogout && (
            <>
              <UserWrapper>
                <UserId>{getCookie("userId")}</UserId>
                <UserImage src={decodeURIComponent(getCookie("userImage"))} />
                <UserMenuWrapper>
                  <UserMenu>예약 목록</UserMenu>
                  <UserMenu onClick={logoutHandler}>로그아웃</UserMenu>
                </UserMenuWrapper>
              </UserWrapper>
            </>
          )}
          {(!document.cookie || isLogout) && (
            <>
              <MenuContent onClick={loginHandler}>로그인</MenuContent>
              <MenuContent>회원가입</MenuContent>
            </>
          )}
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default Header;
