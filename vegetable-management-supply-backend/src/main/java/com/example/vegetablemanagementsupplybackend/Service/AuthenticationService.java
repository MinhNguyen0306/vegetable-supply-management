package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.AuthenticationRequest;
import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.RegisterRequest;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request, Integer type);
    AuthenticationResponse login(AuthenticationRequest request);
}
