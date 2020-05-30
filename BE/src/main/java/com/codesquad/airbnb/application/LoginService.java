package com.codesquad.airbnb.application;

import com.codesquad.airbnb.domain.dto.GitHubOAuth;
import com.codesquad.airbnb.domain.dto.GitHubToken;
import com.codesquad.airbnb.domain.dto.GitHubTokenRequest;
import com.codesquad.airbnb.domain.entity.User;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.codesquad.airbnb.infra.utils.GitHubApiUtils.request;
import static com.codesquad.airbnb.infra.utils.JwtUtils.createToken;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final ObjectMapper mapper;

    private final GitHubOAuth gitHubOAuth;

    public ResponseEntity<Void> login(String code, HttpServletResponse response) throws JsonProcessingException {
        User user = requestUserInfo(code);
        setCookie(user.getNickName(), response);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    private User requestUserInfo(String code) throws JsonProcessingException {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuth.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuth), GitHubToken.class)
                .getAccessToken();

        String userData = request(accessToken, gitHubOAuth.getUserApiUrl()).getBody();
        return parseUserInfo(userData);
    }

    private void setCookie(String nickname, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", createToken(nickname))
                .domain("127.0.0.1")
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(60*60*24)
                .httpOnly(true)
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private User parseUserInfo(String data) throws JsonProcessingException {
        JsonNode userData = mapper.readValue(data, JsonNode.class);

        Long id = userData.get("id").asLong();
        String userId = userData.get("login").asText();
        String pictureUrl = userData.get("avatar_url").asText();

        return new User(id, userId, pictureUrl);
    }
}
