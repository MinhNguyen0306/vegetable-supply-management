package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.AuthenticationRequest;
import com.example.vegetablemanagementsupplybackend.DTO.RequestPayload.RegisterRequest;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.AuthenticationResponse;
import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Entity.Role;
import com.example.vegetablemanagementsupplybackend.Entity.User;
import com.example.vegetablemanagementsupplybackend.Exception.ApiException;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.MartRepository;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Repository.RoleRepository;
import com.example.vegetablemanagementsupplybackend.Repository.UserRepository;
import com.example.vegetablemanagementsupplybackend.Service.AuthenticationService;
import com.example.vegetablemanagementsupplybackend.Service.JwtService;
import com.example.vegetablemanagementsupplybackend.Util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MartRepository martRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request, Integer type) {
        Role role = this.roleRepository.findById(type).get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        var user = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .address(request.getAddress())
                .phone(request.getPhone())
                .pass(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .build();

        if(type.equals(AppConstants.MART)) {
            Mart mart = new Mart();
            mart.setMartName(new RandomUtil().randomMartName());
            mart.setUser(user);
            martRepository.save(mart);
        } else if(type.equals(AppConstants.PROVIDER)) {
            Provider provider = new Provider();
            provider.setProviderName(new RandomUtil().randomProviderName());
            provider.setUser(user);
            providerRepository.save(provider);
        }

        this.userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (BadCredentialsException e) {
            log.error("Bad Credentials", e.getMessage());
            throw new ApiException("Invalid username or password!");
        }
    }
}
