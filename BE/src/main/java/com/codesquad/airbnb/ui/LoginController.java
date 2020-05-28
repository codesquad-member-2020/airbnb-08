package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.application.LoginService;
import com.codesquad.airbnb.domain.dto.GitHubToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/github")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/login")
    public ResponseEntity<String> login(@PathParam("code") String code, HttpServletResponse response) {
        GitHubToken gitHubToken = loginService.getAccessToken(code);
        response.setHeader("Authorization", gitHubToken.getAuthorizationValue());
        return ResponseEntity.ok("logined");
    }
}
