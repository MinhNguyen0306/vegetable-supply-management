package com.example.vegetablemanagementsupplybackend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "medias")
@Data
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_media")
    private int id;
    private String mediaName;
    private String url;
    private String extension;

    @ManyToOne
    @JoinColumn(name = "id_certificate")
    private Certificate certificate;

    @ManyToOne
    @JoinColumn(name = "id_vegetable")
    private Vegetable vegetable;
}
