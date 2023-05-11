package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "providers")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Provider {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_provider")
    private String id;

    private String providerName;

    private String productionArea;
    private String annualOutput;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date yearActive;

    @Enumerated(EnumType.STRING)
    private ProviderStatusEnum status;

    @JsonManagedReference(value = "provider-user")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;

//    @JsonManagedReference(value = "unit-provider")
//    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private List<Unit> units;

    @JsonManagedReference(value = "vegetable-provider")
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vegetable> vegetables = new ArrayList<>();

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contract> contracts = new ArrayList<>();

}
