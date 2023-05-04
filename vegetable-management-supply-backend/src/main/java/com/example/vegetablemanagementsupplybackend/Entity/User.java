package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_user")
    private String id;

    @Column(unique = true)
    private String userName;
    private String email;
    private String address;
    private String phone;

    @Column(name = "password_hash")
    private String password;
}
