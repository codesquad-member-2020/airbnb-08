package com.codesquad.airbnb.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "Invalid Input Value"),
    HANDLE_ACCESS_DENIED(403, "Access is Denied"),
    UNAUTHORIZED(401, "Please Login");

    private final int status;
    private final String message;
}
