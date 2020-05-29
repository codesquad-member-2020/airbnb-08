package com.codesquad.airbnb.infra.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class GitHubApiUtils {

    public static ResponseEntity<String> request(String accessToken, String apiUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return new RestTemplate().exchange(apiUrl, HttpMethod.GET, entity, String.class);
    }

}
