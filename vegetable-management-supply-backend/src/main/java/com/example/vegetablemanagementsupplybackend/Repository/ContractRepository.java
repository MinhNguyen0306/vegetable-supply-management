package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends JpaRepository<Contract, String> {
}
