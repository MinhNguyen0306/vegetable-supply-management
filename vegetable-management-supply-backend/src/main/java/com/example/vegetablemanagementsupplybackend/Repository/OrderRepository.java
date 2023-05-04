package com.example.vegetablemanagementsupplybackend.Repository;

import com.example.vegetablemanagementsupplybackend.Entity.Order;
import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query("SELECT o FROM Order o WHERE o.orderStatus = ?1")
    Page<Order> filterOrderByStatus(OrderStatusEnum orderStatusEnum, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.mart.id = ?1")
    Page<Order> findByMart(String martId, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.mart.id = ?1 AND o.orderStatus = ?2")
    Page<Order> findByMartAndStatus(String martId, OrderStatusEnum orderStatusEnum, Pageable pageable);
}
