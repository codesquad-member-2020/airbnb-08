package com.codesquad.airbnb.application;

import com.codesquad.airbnb.domain.dto.GitHubOAuth;
import com.codesquad.airbnb.domain.dto.GitHubToken;
import com.codesquad.airbnb.domain.dto.GitHubTokenRequest;
import com.codesquad.airbnb.domain.entity.User;
import com.codesquad.airbnb.infra.dao.UserDAO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static com.codesquad.airbnb.infra.utils.GitHubApiUtils.request;
import static com.codesquad.airbnb.infra.utils.JwtUtils.createToken;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserDAO userDAO;

    private final ObjectMapper mapper = new ObjectMapper(); // create once, reuse

    private final GitHubOAuth gitHubOAuth;

    public Object login(String code, HttpServletResponse response) throws JsonProcessingException {
        User user = requestUserInfo(code);
        return setResponse(user, response);
    }

    private User requestUserInfo(String code) throws JsonProcessingException {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuth.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuth), GitHubToken.class)
                .getAccessToken();

        String userData = request(accessToken, gitHubOAuth.getUserApiUrl()).getBody();
        return parseUserInfo(userData);
    }

    private HttpServletResponse setResponse(User user, HttpServletResponse response) {
        Map<String, Object> userMap = mapper.convertValue(user, Map.class);

        Cookie cookie = new Cookie("jwt", createToken(userMap));
        cookie.setPath("/");

        response.addCookie(cookie);

        return response;
    }

    private User parseUserInfo(String data) throws JsonProcessingException {
        JsonNode userData = mapper.readValue(data, JsonNode.class);

        Long id = userData.get("id").asLong();
        String userId = userData.get("login").asText();
        String pictureUrl = userData.get("avatar_url").asText();

        return new User(id, userId, pictureUrl);
    }
}
