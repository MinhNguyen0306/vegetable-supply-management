package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.CertificateStatusEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "certificates")
@Data
@NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
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

    @JsonBackReference(value = "vegetable-certificate")
    @ManyToMany(mappedBy = "certificates")
    private Set<Vegetable> vegetables;

    @JsonBackReference(value = "certificate-media")
    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Media> medias = new ArrayList<>();
}
