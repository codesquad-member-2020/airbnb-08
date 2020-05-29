package com.codesquad.airbnb.application;

import com.codesquad.airbnb.domain.dto.GitHubOAuth;
import com.codesquad.airbnb.domain.dto.GitHubToken;
import com.codesquad.airbnb.domain.dto.GitHubTokenRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.codesquad.airbnb.infra.utils.GitHubApiUtils.request;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final GitHubOAuth gitHubOAuth;

    public Object requestUserApi(String code) {
        String accessToken = new RestTemplate()
                .postForObject(gitHubOAuth.getAccessTokenUrl(), new GitHubTokenRequest(code, gitHubOAuth), GitHubToken.class)
                .getAccessToken();

        request(accessToken, gitHubOAuth.getUserApiUrl());
    }

    public GitHubToken login(String code) {
        return null;
    }

    private void makeCookie() {

    }
}
