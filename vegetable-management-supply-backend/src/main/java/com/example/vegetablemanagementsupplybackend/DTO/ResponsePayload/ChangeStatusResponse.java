package com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class ChangeStatusResponse {
    private String message;
    private String fromStatus;
    private String toStatus;
}
