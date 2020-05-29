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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.codesquad.airbnb.infra.utils.GitHubApiUtils.request;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserDAO userDAO;

    private final ObjectMapper mapper = new ObjectMapper(); // create once, reuse

    private final GitHubOAuth gitHubOAuth;

    public ResponseEntity<String> requestUserInfo(String code) {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuth.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuth), GitHubToken.class)
                .getAccessToken();

        String data = request(accessToken, gitHubOAuth.getUserApiUrl()).getBody();
        User user = parseUserInfo(data);
        userDAO.save(user);
    }

    private User parseUserInfo(String data) throws JsonProcessingException {
        JsonNode userData = mapper.readValue(data, JsonNode.class);
        Long id = userData.get("id").asLong();
        String userId = userData.get("login").asText();
        String pictureUrl = userData.get("avatar_url").asText();
        return new User(id, userId, pictureUrl);
    }

    public GitHubToken login(String code) {
        return null;
    }

    private void makeCookie() {

    }
}
