package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "units")
@Data
@Builder
@NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(
    scope = Unit.class,
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unit")
    private int id;

    private String unitName;

    // Edit field
    @ManyToMany(mappedBy = "units", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vegetable> vegetables;

}
