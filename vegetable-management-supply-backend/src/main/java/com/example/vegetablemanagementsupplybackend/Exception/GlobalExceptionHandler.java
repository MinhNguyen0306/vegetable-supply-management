package com.example.vegetablemanagementsupplybackend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(
            ResourceNotFoundException exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
                new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false));
        return new ResponseEntity(errorDetail, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(
            ResourceNotFoundException exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
                new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false));
        return new ResponseEntity(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgNotValidException(MethodArgumentNotValidException exception) {
        Map<String, String> resp = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = error.getObjectName();
            String message = error.getDefaultMessage();
            resp.put(fieldName, message);
        });
        return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);
    }
}
