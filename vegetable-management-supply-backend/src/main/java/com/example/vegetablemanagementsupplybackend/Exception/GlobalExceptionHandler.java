package com.example.vegetablemanagementsupplybackend.Exception;

import jakarta.servlet.http.HttpServletRequest;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(
            Exception exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
                new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false));
        return new ResponseEntity(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(
            ResourceNotFoundException exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
                new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false));
        return new ResponseEntity(errorDetail, HttpStatus.NOT_FOUND);
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

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
                new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false));
        return new ResponseEntity(errorDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UploadFileException.class)
    public ResponseEntity<?>  handleUploadFileException(UploadFileException exception, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
            new Date(), exception.getMessage(), request.getContextPath(), request.getDescription(false)
        );
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<?> handleDuplicateException(DuplicateException exception, HttpServletRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(
            new Date(), exception.getMessage(), request.getContextPath(), ""
        );
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }
}
