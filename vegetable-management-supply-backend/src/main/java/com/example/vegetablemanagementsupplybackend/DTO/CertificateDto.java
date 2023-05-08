package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.Media;
import com.example.vegetablemanagementsupplybackend.Enum.CertificateStatusEnum;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@RequiredArgsConstructor
public class CertificateDto {
    private String id;
    private String nameCertificate;
    private Date effectiveDate;
    private Date expirationDate;
    private String certificatePlace;
    private CertificateStatusEnum certificateStatus;
    private List<Media> medias;
}
