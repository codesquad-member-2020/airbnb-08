package com.codesquad.airbnb.user.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;

import static com.codesquad.airbnb.common.utils.JwtUtils.decrypt;

@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {

        if(request.getMethod().equals("GET")) {
            return true;
        }

        Cookie[] cookies = request.getCookies();
        validateCookies(cookies);
        return true;
    }

    private void validateCookies(Cookie[] cookies) {
        String[] cookieKeys = {"jwt", "userId", "userImage"};

        if(Arrays.stream(cookieKeys)
                .anyMatch(key -> isIllegalCookie(cookies, key))) {
            throw new IllegalArgumentException("쿠키가 없거나 같은 키의 쿠키가 여러개 존재합니다");
        }
    }

    private boolean isIllegalCookie(Cookie[] cookies, String key) {
        return Arrays.stream(cookies)
                .filter(c -> c.getName().equals(key))
                .count() != 1;
    }
}
