package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(
    scope = Role.class,
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
public class Role {
    @Id
    @Column(name = "id_role")
    private int id;

    @Column(name = "role_name")
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;
}
