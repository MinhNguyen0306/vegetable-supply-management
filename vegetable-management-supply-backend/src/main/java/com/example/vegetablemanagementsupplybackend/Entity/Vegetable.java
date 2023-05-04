package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "vegetables")
@Data
@NoArgsConstructor
public class Vegetable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_vegetable")
    private String id;

    private String vegetableName;
    private int currentStock;
    private double currentPricing;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_category")
    private Category category;

    @ManyToMany
    @JoinTable(
        name = "vegetable_unit",
        joinColumns = @JoinColumn(name = "id_vegetable"),
        inverseJoinColumns = @JoinColumn(name = "id_unit")
    )
    private Set<Unit> units;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_provider")
    private Provider provider;

    @ManyToMany
    @JoinTable(
        name = "vegetable_certificate",
        joinColumns = @JoinColumn(name = "id_vegetable"),
        inverseJoinColumns = @JoinColumn(name = "id_certificate")
    )
    private Set<Certificate> certificates = new HashSet<>();

    @OneToMany(mappedBy = "vegetable", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "vegetable", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Media> medias;
}
