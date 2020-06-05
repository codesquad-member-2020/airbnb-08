package com.codesquad.airbnb.common.config.resttemplate;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@RequiredArgsConstructor
public class RestTemplateConfig {

    private final RestTemplateBuilder restTemplateBuilder;

    @Bean
    public RestTemplate localTestTemplate() {
        return restTemplateBuilder.rootUri("http://3.34.110.161/")
                .additionalInterceptors(new RestTemplateClientHttpRequestInterceptor())
                .errorHandler(new RestTemplateErrorHandler())
                .setConnectTimeout(Duration.ofMinutes(3))
                .build();
    }
}
