package com.codesquad.airbnb.domain.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties("github")
@ToString
public class OAuthAppInfo {

    private String codeUrlBase;

    private String codeUrlOption;

    private String accessTokenUrl;

    private String clientId;

    private String clientSecret;
}
