package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "policy_types")
@Data
@NoArgsConstructor
public class PolicyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_policy_type")
    private int id;

    private String title;

    @OneToMany(mappedBy = "policyType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Policy> policies;
}
