package com.codesquad.airbnb.user.ui;

import com.codesquad.airbnb.user.application.LoginService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/github")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login")
    public Object login(String code, HttpServletResponse response) throws IOException {
        return loginService.login(code, response);
    }
}
