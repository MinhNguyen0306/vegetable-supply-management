package com.example.vegetablemanagementsupplybackend.Entity;

import com.example.vegetablemanagementsupplybackend.Enum.OrderStatusEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDHexGenerator")
    @Column(name = "id_order")
    private String id;

    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;

    @JsonFormat(pattern = "yyyy-MM-yy")
    private Date deliveryDate;

    @Enumerated(EnumType.STRING)
    private OrderStatusEnum orderStatus;

    @JsonBackReference(value = "mart-order")
    @ManyToOne
    @JoinColumn(name = "id_mart")
    private Mart mart;

    @JsonManagedReference(value = "order-item")
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();
}
