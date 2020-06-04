package com.codesquad.airbnb.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalRestExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<String> handleServerException(Exception e) {
        return new ResponseEntity<>("서버 에러입니다", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<String> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return new ResponseEntity<>("지원하지 않는 메소드입니다", HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(InputMistakeException.class)
    protected ResponseEntity<String> handleInputMistakeException(InputMistakeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
