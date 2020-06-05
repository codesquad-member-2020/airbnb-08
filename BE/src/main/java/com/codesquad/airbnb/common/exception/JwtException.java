package com.codesquad.airbnb.common.exception;

public class JwtException extends RuntimeException {

    public JwtException(String message) {
        super(message);
    }
}
