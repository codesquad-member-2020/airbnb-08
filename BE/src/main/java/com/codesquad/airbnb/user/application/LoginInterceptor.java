package com.codesquad.airbnb.user.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;

import static com.codesquad.airbnb.user.application.JwtUtils.decrypt;

@Slf4j
@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {

        log.info("토큰 검증 시작!");
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new IllegalArgumentException("쿠키가 없습니다!");
        }

        Cookie cookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("jwt"))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("JWT 토큰이 존재하지 않습니다!"));

        String jwtToken = cookie.getValue();
        decrypt(jwtToken);
        return true;
    }
}
