package com.example.vegetablemanagementsupplybackend.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ErrorDetail {
    private Date timestamp;
    private String message;
    private String description;
    private String location;
}
