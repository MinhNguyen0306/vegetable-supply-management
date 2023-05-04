package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.ContractStatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "contracts")
@Data
@NoArgsConstructor
public class Contract {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_contract")
    private String id;

    private String nameContract;
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date requireDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date effectiveDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date expireDate;

    @Enumerated(EnumType.STRING)
    private ContractStatusEnum contractStatus;

    private String dailySupplyCapacity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_provider")
    private Provider provider;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_mart")
    private Mart mart;

    @ManyToMany
    @JoinTable(
        name = "contract_policy",
        joinColumns = @JoinColumn(name = "id_contract"),
        inverseJoinColumns = @JoinColumn(name = "id_policy")
    )
    private List<Policy> policies = new ArrayList<>();
}
