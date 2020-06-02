package com.codesquad.airbnb.user.application;

import com.codesquad.airbnb.user.domain.GitHubOAuthProperty;
import com.codesquad.airbnb.user.domain.GitHubAccessToken;
import com.codesquad.airbnb.user.domain.GitHubTokenRequest;
import com.codesquad.airbnb.user.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Locale;

import static com.codesquad.airbnb.user.application.GitHubApiUtils.request;
import static com.codesquad.airbnb.user.application.JwtUtils.createToken;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final ObjectMapper mapper;

    private final GitHubOAuthProperty gitHubOAuthProperty;

    public ResponseEntity<Void> login(String code, HttpServletResponse response) throws IOException {
        User user = requestUserInfo(code);
        setCookie(user.getNickName(), response);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    private User requestUserInfo(String code) throws JsonProcessingException {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuthProperty.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuthProperty), GitHubAccessToken.class)
                .getAccessToken();

        String userData = request(accessToken, gitHubOAuthProperty.getUserApiUrl()).getBody();
        return parseUserInfo(userData);
    }

    private void setCookie(String nickname, HttpServletResponse response) throws IOException {
        ResponseCookie cookie = ResponseCookie.from("jwt", createToken(nickname))
                .domain("127.0.0.1")
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(60*60*24)
                .httpOnly(true)
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        response.sendRedirect("http://localhost:8080/main");
    }

    private User parseUserInfo(String data) throws JsonProcessingException {
        JsonNode userData = mapper.readValue(data, JsonNode.class);

        Long id = userData.get("id").asLong();
        String userId = userData.get("login").asText();
        String pictureUrl = userData.get("avatar_url").asText();

        return new User(id, userId, pictureUrl);
    }
}
