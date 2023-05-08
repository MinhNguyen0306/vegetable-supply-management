package com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
}
