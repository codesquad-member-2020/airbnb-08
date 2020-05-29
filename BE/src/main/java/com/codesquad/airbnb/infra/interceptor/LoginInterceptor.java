package com.codesquad.airbnb.infra.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.codesquad.airbnb.infra.utils.JwtUtils.verifyToken;

@Slf4j
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {

        log.info("토큰 검증 시작!");
        Cookie cookie = request.getCookies()[0];
        if (cookie == null) {
            throw new IllegalArgumentException("no cookie");
        }

        String jwtToken = cookie.getValue();
        verifyToken(jwtToken);
        return true;
    }
}
