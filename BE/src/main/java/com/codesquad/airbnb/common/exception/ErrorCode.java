package com.codesquad.airbnb.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Common
    INVALID_INPUT_VALUE(400, "Invalid Input Value"),
    ENTITY_NOT_FOUND(400, "Entity Not Found"),
    INVALID_TYPE_VALUE(400, "Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "Access is Denied"),
    INVALID_JWT_TOKEN(403, "Invalid Jwt Token"),
    METHOD_NOT_ALLOWED(405, "Invalid Input Value"),
    INTERNAL_SERVER_ERROR(500, "Server Error"),

    // User
    UNAUTHORIZED(401, "Please Login");

    private final int status;
    private final String message;
}
