package com.codesquad.airbnb.common.exception;

public class IllegalReservationDateException extends RuntimeException {

    private final String name;

    public static final String ERROR_CODE = "Input"

    public IllegalReservationDateException(String message) {
        super(message);
    }
}
