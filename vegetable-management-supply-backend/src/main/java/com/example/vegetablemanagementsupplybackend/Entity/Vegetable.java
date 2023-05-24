package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "vegetables")
@Data
@NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
public class Vegetable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id", unique = true)
    private String id;

    private String vegetableName;
    private int currentStock;
    private double currentPricing;

    @Column(columnDefinition = "bit default 0")
    private boolean isLock;

    @JsonBackReference(value = "vegetable-category")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_category", referencedColumnName = "id_category")
    private Category category;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "vegetable_unit",
        joinColumns = @JoinColumn(name = "id_vegetable"),
        inverseJoinColumns = @JoinColumn(name = "id_unit")
    )
    private List<Unit> units;
    @JsonBackReference(value = "vegetable-provider")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_provider", referencedColumnName = "id_provider")
    private Provider provider;

    @ManyToMany
    @JoinTable(
        name = "vegetable_certificate",
        joinColumns = @JoinColumn(name = "id_vegetable"),
        inverseJoinColumns = @JoinColumn(name = "id_certificate")
    )
    private Set<Certificate> certificates = new HashSet<>();

    @JsonManagedReference(value = "vegetable-item")
    @OneToMany(mappedBy = "vegetable", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();

    @JsonManagedReference(value = "vegetable-media")
    @OneToMany(mappedBy = "vegetable", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Media> medias = new ArrayList<>();
}
