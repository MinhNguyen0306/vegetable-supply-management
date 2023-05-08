package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unit")
    private int id;

    @Column(unique = true)
    private String unitName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_provider")
    private Provider provider;

    @ManyToMany(mappedBy = "units", fetch = FetchType.LAZY)
    private List<Vegetable> vegetables;
}
