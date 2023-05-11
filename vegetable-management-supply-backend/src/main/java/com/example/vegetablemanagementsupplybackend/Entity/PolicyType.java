package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "policy_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_policy_type")
    private int id;

    private String title;

    @OneToMany(mappedBy = "policyType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Policy> policies;
}
