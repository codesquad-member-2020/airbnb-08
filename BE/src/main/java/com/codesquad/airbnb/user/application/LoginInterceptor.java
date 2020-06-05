package com.codesquad.airbnb.user.application;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;

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

        if(cookies == null) {
            return false;
        }

        validateCookies(cookies, "jwt");
        return true;
    }

    private boolean validateCookies(Cookie[] cookies, String key) {
        return Arrays.stream(cookies)
                .filter(c -> c.getName().equals(key))
                .count() != 1;
    }
}
