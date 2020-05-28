package com.codesquad.airbnb.infra.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtils {
    public static String createToken() {
        String key = "a";

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payloads = new HashMap<>();
        Long expiredTime = 1000 * 60L; // 만료 기간 1분(기본 1ms)
        Date now = new Date();
        now.setTime(now.getTime() + expiredTime);
        payloads.put("exp", now);
        payloads.put("data", "hello world!");

        return Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .signWith(SignatureAlgorithm.HS256, key.getBytes())
                .compact();
    }
}
