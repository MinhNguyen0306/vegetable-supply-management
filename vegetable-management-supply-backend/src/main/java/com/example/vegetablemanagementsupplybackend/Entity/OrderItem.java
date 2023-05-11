package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_order_item")
    private String id;

    private int quantity;

    @JsonBackReference(value = "vegetable-item")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vegetable")
    private Vegetable vegetable;

    @JsonBackReference(value = "order-item")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_order")
    private Order order;
}
