package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Mart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MartRepository extends JpaRepository<Mart, String> {
}
