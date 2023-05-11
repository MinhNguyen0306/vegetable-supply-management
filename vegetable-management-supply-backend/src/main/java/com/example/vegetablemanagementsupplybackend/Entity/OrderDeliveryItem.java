package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "order_delivery_items")
@Data
@NoArgsConstructor @AllArgsConstructor
public class OrderDeliveryItem {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_order_delivery_item")
    private String id;

    private int quantity;
}
