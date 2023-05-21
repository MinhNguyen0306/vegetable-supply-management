package com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload;

import com.example.vegetablemanagementsupplybackend.DTO.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    UserDto user;
    Map<String, String> tokens;
}
