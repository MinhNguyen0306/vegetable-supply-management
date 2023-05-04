package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
}
