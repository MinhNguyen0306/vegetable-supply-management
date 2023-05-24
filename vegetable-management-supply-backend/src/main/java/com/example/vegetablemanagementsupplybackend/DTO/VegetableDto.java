package com.example.vegetablemanagementsupplybackend.DTO;

import com.example.vegetablemanagementsupplybackend.Entity.Media;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VegetableDto {
    private String id;
    private String vegetableName;
    private int currentStock;
    private double currentPricing;
    private boolean isLock;
    private CategoryDto category;
    private List<UnitDto> units;
    private ProviderDto provider;
    private Set<CertificateDto> certificates;
    private List<OrderItemDto> orderItems;
    private List<Media> medias;
}
