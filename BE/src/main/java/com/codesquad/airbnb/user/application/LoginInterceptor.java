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

        if(request.getMethod().equals("GET")) {
            return true;
        }

        log.info("토큰 검증 시작!");

        Cookie[] cookies = request.getCookies();
        validateCookies(cookies);

        Cookie cookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("jwt"))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("JWT 토큰이 존재하지 않습니다!"));

        String jwtToken = cookie.getValue();
        Long id = (Long) decrypt(jwtToken).get("id");
        request.setAttribute("id", id);

        return true;
    }

    private void validateCookies(Cookie[] cookies) {
        String[] cookieKeys = {"jwt", "userId", "userImage"};

        if(Arrays.stream(cookieKeys)
                .anyMatch(key -> isIllegalCookie(cookies, key))) {
            throw new IllegalArgumentException("쿠키를 다시 한 번 확인해주세요");
        }
    }

    private boolean isIllegalCookie(Cookie[] cookies, String key) {
        return Arrays.stream(cookies)
                .filter(c -> c.getName().equals(key))
                .count() != 1;
    }
}
