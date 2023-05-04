package com.example.vegetablemanagementsupplybackend.DTO;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDto {
    private int id;

    @NotEmpty
    private String categoryName;
}
