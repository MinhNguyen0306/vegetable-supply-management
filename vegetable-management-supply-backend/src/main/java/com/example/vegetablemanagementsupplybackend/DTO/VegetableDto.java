package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class VegetableDto {
    private String id;
    private String vegetableName;
    private double currentPricing;
    private Category category;
    private Set<Unit> units;
    private Provider provider;
    private Set<Certificate> certificates = new HashSet<>();
    private List<OrderItem> orderItems;
    private List<Media> medias;
}
