package com.example.vegetablemanagementsupplybackend.Exception;

public class UploadFileException extends RuntimeException{
    private String fileName;

    public UploadFileException(String fileName) {
        super(String.format("File upload failed with %s", fileName));
    }
}
