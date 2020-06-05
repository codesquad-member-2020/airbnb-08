package com.codesquad.airbnb.user.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;

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

        Cookie[] cookies = request.getCookies();

        log.info("cookies : {}", cookies);
        log.info("headerNames : {}",request.getHeaderNames());

        if(cookies == null) {
            return false;
        }

        return validateCookies(cookies, "jwt");
    }

    private boolean validateCookies(Cookie[] cookies, String key) {
        return Arrays.stream(cookies)
                .filter(c -> c.getName().equals(key))
                .count() == 1;
    }
}
