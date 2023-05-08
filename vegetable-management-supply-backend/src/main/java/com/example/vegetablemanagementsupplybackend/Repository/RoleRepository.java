package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
