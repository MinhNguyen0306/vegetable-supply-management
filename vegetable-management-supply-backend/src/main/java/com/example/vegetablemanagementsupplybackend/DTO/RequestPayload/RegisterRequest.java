package com.example.vegetablemanagementsupplybackend.DTO.RequestPayload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String userName;
    private String email;
    private String address;
    private String phone;
    private String password;
}
