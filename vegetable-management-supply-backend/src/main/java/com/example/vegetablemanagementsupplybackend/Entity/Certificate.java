package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.CertificateStatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "certificates")
@Data
@NoArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_certificate")
    private String id;

    private String nameCertificate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date effectiveDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date expirationDate;

    private String certificatePlace;

    @Enumerated(EnumType.STRING)
    private CertificateStatusEnum certificateStatus;

    @ManyToMany(mappedBy = "certificates")
    private Set<Vegetable> vegetables;

    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Media> medias;
}
