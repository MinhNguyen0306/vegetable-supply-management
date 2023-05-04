package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_order_item")
    private String id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "id_vegetable")
    private Vegetable vegetable;

    @ManyToOne
    @JoinColumn(name = "id_order")
    private Order order;
}
