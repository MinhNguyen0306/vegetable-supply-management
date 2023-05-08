package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.AuthenticationRequest;
import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.RegisterRequest;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.AuthenticationResponse;
import com.example.vegetablemanagementsupplybackend.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request,
            @RequestParam(value = "type", defaultValue = AppConstants.MART, required = false) Integer type
    ) {
        return ResponseEntity.ok(authenticationService.register(request, type));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
