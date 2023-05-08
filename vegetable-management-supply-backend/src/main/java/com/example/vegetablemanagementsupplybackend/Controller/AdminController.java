package com.example.vegetablemanagementsupplybackend.Controller;

import com.cloudinary.Api;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ApiResponse;
import com.example.vegetablemanagementsupplybackend.Service.ProviderService;
import com.example.vegetablemanagementsupplybackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    @Autowired
    private ProviderService providerService;
    @Autowired
    private UserService userService;

    @PutMapping("/resolve-accounts")
    public ResponseEntity<ApiResponse> resolveProviderSignup(
            @RequestParam("providerId") String providerId,
            @RequestParam("typeResolve") String typeResolve
    ) {
        this.providerService.resolveProviderSignup(providerId, typeResolve);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Resolved provider!"), HttpStatus.OK);
    }
}
