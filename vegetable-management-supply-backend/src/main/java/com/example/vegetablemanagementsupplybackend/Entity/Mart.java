package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "marts")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Mart {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_mart")
    private String id;

    private String martName;
    private String faxCode;

    @JsonManagedReference(value = "mart-user")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;

    @JsonManagedReference(value = "mart-order")
    @OneToMany(mappedBy = "mart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Order> orders;

    @OneToMany(mappedBy = "mart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contract> contracts = new ArrayList<>();
}
