package com.codesquad.airbnb.user.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GitHubTokenRequest {

    @JsonProperty("code")
    private String code;

    @JsonProperty("client_id")
    private String clientId;

    @JsonProperty("client_secret")
    private String clientSecret;

    public GitHubTokenRequest(String code, GitHubOAuthProperty clientInfo) {
        this.code = code;
        this.clientId = clientInfo.getClientId();
        this.clientSecret = clientInfo.getClientSecret();
    }
}
