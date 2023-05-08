package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.ContractDto;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ChangeStatusResponse;

public interface ContractService {
    ContractDto createContract(String userId, ContractDto contractDto);
    ContractDto updateContract(String contractId);
    ChangeStatusResponse cancelContract(String userId, String contractId);
    ChangeStatusResponse signedContract(String userId, String contractId);
    ChangeStatusResponse rejectContract(String userId, String contractId);
    ChangeStatusResponse acceptContract(String userId, String contractId);
}
