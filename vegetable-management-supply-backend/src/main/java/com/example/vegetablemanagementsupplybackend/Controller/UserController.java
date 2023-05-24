package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.DTO.ProviderDto;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("providers/status/{type}")
    public ResponseEntity<List<ProviderDto>> getProvidesByStatus(@PathVariable("type") ProviderStatusEnum status) {
        List<ProviderDto> providerDtoList = this.providerService.getProvidesByStatus(status);
        return ResponseEntity.ok(providerDtoList);
    }

    @PutMapping("providers/{providerId}/{typeResolve}")
    public ResponseEntity resolveProviderSignup(
        @PathVariable String providerId,
        @PathVariable String typeResolve
    ) {
        this.providerService.resolveProviderSignup(providerId, typeResolve);
        return new ResponseEntity(HttpStatus.OK);
    }
}
