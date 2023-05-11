package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VegetableRepository extends JpaRepository<Vegetable, String> {

    @Query("SELECT v FROM Vegetable v WHERE v.category.id = :categoryId")
    Page<Vegetable> getAllVegetablesByCategory(@Param(value = "categoryId") Integer categoryId, Pageable pageable);

    @Query("SELECT v FROM Vegetable v WHERE v.provider.id = ?1")
    Page<Vegetable> getVegetablesByProvider(String providerId, Pageable pageable);

    @Query("SELECT v FROM Vegetable v WHERE v.vegetableName LIKE ?1")
    Page<Vegetable> getVegetablesByKeySearch(String keySearch, Pageable pageable);
}
