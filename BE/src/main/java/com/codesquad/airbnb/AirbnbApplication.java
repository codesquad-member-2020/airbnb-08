package com.codesquad.airbnb;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class AirbnbApplication {

    public static void main(String[] args) {
        log.info("Environment : {}", System.getenv("JASYPT_PASSWORD"));
        SpringApplication.run(AirbnbApplication.class, args);
    }
}
