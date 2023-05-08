package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.ContractConverter;
import com.example.vegetablemanagementsupplybackend.DTO.ContractDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;
import com.example.vegetablemanagementsupplybackend.Entity.User;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.ContractRepository;
import com.example.vegetablemanagementsupplybackend.Repository.UserRepository;
import com.example.vegetablemanagementsupplybackend.Service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractRepository contractRepository;
    @Autowired
    private UserRepository userRepository;

    private final ContractConverter contractConverter;
    @Override
    public ContractDto createContract(String userId, ContractDto contractDto) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
        return null;
    }

    @Override
    public ContractDto updateContract(String contractId) {
        return null;
    }

    @Override
    public ChangeStatusResponse cancelContract(String userId, String contractId) {
        return null;
    }

    @Override
    public ChangeStatusResponse signedContract(String userId, String contractId) {
        return null;
    }

    @Override
    public ChangeStatusResponse rejectContract(String userId, String contractId) {
        return null;
    }

    @Override
    public ChangeStatusResponse acceptContract(String userId, String contractId) {
        return null;
    }
}
