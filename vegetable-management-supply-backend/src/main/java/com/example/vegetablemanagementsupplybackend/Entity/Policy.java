package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.PolicyStatusEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "policies")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Policy {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_policy")
    private String id;

    private String title;
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date effectiveDate;

    @Enumerated(EnumType.STRING)
    private PolicyStatusEnum policyStatus;

    @ManyToMany(mappedBy = "policies")
    private Set<Contract> contracts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "id_policy_type")
    private PolicyType policyType;
}
