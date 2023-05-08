package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ApiResponse;
import com.example.vegetablemanagementsupplybackend.DTO.CategoryDto;
import com.example.vegetablemanagementsupplybackend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto createdCategory = this.categoryService.createCategory(categoryDto);
        if(createdCategory == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Integer categoryId) {
        CategoryDto categoryDto = this.categoryService.getCategoryById(categoryId);
        if(categoryDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
        return ResponseEntity.ok(categoryDto);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtoList = this.categoryService.getAllCategories();
        if(categoryDtoList.isEmpty() || categoryDtoList == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(categoryDtoList);
    }

    @DeleteMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer categoryId) {
        this.categoryService.deleteCategory(categoryId);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Category is deleted!"), HttpStatus.OK);
    }
}
