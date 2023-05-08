package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "providers")
@Data
@NoArgsConstructor
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

    @OneToOne(mappedBy = "provider")
    private User user;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Unit> units;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vegetable> vegetables = new ArrayList<>();

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contract> contracts = new ArrayList<>();

}
