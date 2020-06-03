package com.codesquad.airbnb.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalRestExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<String> handleServerException(Exception e) {
        return new ResponseEntity<>("서버 에러입니다..", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    
}
