package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.application.LoginService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/github")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login")
    public Object login(String code, HttpServletResponse response) throws JsonProcessingException {
        loginService.login(code, response);
        return null;
    }

    @GetMapping("/info")
    public Object showUserInfo() {
        return null;
    }
}
