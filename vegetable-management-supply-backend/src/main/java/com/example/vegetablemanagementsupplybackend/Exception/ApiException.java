package com.example.vegetablemanagementsupplybackend.Exception;

public class ApiException extends RuntimeException{


    public ApiException(String message) {
        super(message);
    }
}
