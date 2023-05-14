package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private ProviderService providerService;

    @GetMapping("/providers")
    public ResponseEntity<List<ProviderDto>> getAllProviders() {
        List<ProviderDto> providerDtoList = this.providerService.getAllProvider();
        return new ResponseEntity<>(providerDtoList, HttpStatus.OK);
    }

    @GetMapping("/providers/{providerId}")
    public ResponseEntity<ProviderDto> getProviderById(@PathVariable String providerId) {
        ProviderDto provider = this.providerService.getProviderById(providerId);
        return ResponseEntity.ok(provider);
    }
}
