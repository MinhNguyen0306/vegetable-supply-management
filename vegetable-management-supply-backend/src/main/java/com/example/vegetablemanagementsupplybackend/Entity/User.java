package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Util.CustomAuthorityDeserializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
@JsonIdentityInfo(
    scope = User.class,
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
public class User implements UserDetails {
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
    private String pass;

    @JsonBackReference(value = "provider-user")
    @OneToOne(mappedBy = "user")
    private Provider provider;

    @JsonBackReference(value = "mart-user")
    @OneToOne(mappedBy = "user")
    private Mart mart;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "users", referencedColumnName = "id_user"),
        inverseJoinColumns = @JoinColumn(name = "roles", referencedColumnName = "id_role")
    )
    private Set<Role> roles = new HashSet<>();

    @Override
    @JsonDeserialize(using = CustomAuthorityDeserializer.class)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return pass;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
