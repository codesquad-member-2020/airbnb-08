package com.codesquad.airbnb.common.exception;

public class IllegalReservationDateException extends RuntimeException {

    public IllegalReservationDateException(String message) {
        super(message);
    }
}
