package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VegetableRepository extends JpaRepository<Vegetable, String> {

    @Query("SELECT v FROM Vegetable v WHERE v.category.id = :categoryId")
    Page<Vegetable> getAllVegetablesByCategory(@Param(value = "categoryId") Integer categoryId, Pageable pageable);

}
