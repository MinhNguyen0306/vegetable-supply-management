package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.CertificateDto;

import java.util.List;

public interface CertificateService {
    CertificateDto getCertificateById(String certificateId);
    List<CertificateDto> getAllCertificates();
    void deleteCertificate(String certificateId);
}
