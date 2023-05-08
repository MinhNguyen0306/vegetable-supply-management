package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.CategoryDto;
import com.example.vegetablemanagementsupplybackend.Entity.Category;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryConverter {

    @Autowired
    private ModelMapper modelMapper;

    public CategoryDto categoryToDto(Category category) {
        return modelMapper.map(category, CategoryDto.class);
    }

    public Category dtoToCategory(CategoryDto categoryDto) {
        return modelMapper.map(categoryDto, Category.class);
    }

    public List<CategoryDto> categoriesToDto(List<Category> categories) {
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
    }
}
