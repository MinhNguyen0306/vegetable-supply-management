package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Table(name = "roles")
@RequiredArgsConstructor
@Data
public class Role {
    @Id
    @Column(name = "id_role")
    private int id;

    @Column(name = "role_name")
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;
}
