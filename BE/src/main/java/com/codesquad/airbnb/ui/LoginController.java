package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.application.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/github")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam("code") String code) {
        System.out.println(loginService.getAccessToken(code));
        return ResponseEntity.ok("logined");
    }
}
