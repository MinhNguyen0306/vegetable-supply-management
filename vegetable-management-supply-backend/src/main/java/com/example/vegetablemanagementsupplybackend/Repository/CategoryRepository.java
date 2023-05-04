package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
