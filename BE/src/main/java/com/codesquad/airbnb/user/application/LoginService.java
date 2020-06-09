package com.codesquad.airbnb.user.application;

import com.codesquad.airbnb.user.domain.GitHubAccessToken;
import com.codesquad.airbnb.user.domain.GitHubOAuthProperty;
import com.codesquad.airbnb.user.domain.GitHubTokenRequest;
import com.codesquad.airbnb.user.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static com.codesquad.airbnb.common.utils.JwtUtils.createToken;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final ObjectMapper mapper;

    private final GitHubOAuthProperty gitHubOAuthProperty;

    public HttpHeaders oauth() {
        HttpHeaders headers = new HttpHeaders();

        URI uri = UriComponentsBuilder.fromUriString("https://github.com/login/oauth/authorize")
                .queryParam("client_id", gitHubOAuthProperty.getClientId())
                .queryParam("scope", "user")
                .build()
                .toUri();

        headers.setLocation(uri);
        return headers;
    }

    public ResponseEntity<Void> login(String code, HttpServletResponse response) throws IOException {
        User user = requestUserInfo(code);
        setCookie(user, response);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    private User requestUserInfo(String code) throws JsonProcessingException {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuthProperty.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuthProperty), GitHubAccessToken.class)
                .getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String userData = new RestTemplate().exchange(gitHubOAuthProperty.getUserApiUrl(), HttpMethod.GET, entity, String.class).getBody();
        return parseUserInfo(userData);
    }

    private void setCookie(User user, HttpServletResponse response) throws IOException {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getUserId());

        response.addCookie(new Cookie("jwt", createToken(userMap)));
        response.addCookie(new Cookie("userId", user.getNickName()));
        response.addCookie(new Cookie("userImage", user.getPictureUrl()));
        response.sendRedirect("http://3.34.110.161/");
    }

    private User parseUserInfo(String data) throws JsonProcessingException {
        JsonNode userData = mapper.readValue(data, JsonNode.class);

        Long id = userData.get("id").asLong();
        String userId = userData.get("login").asText();
        String pictureUrl = userData.get("avatar_url").asText();

        return new User(id, userId, pictureUrl);
    }
}
