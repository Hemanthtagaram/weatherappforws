package com.weatherapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());
        
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        if (ex.getMessage().contains("City not found")) {
            status = HttpStatus.NOT_FOUND;
        } else if (ex.getMessage().contains("Invalid API key")) {
            status = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<>(body, status);
    }
}
