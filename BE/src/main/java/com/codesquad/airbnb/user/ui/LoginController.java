package com.codesquad.airbnb.user.ui;

import com.codesquad.airbnb.user.application.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/github")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/oauth")
    public ResponseEntity<String> oauth() {
        return new ResponseEntity<>(loginService.oauth(), HttpStatus.SEE_OTHER);
    }

    @GetMapping("/login")
    public Object login(String code, HttpServletResponse response) throws IOException {
        return loginService.login(code, response);
    }
}
