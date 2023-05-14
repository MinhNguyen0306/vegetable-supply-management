package com.example.vegetablemanagementsupplybackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_media")
    private int id;
    private String mediaName;
    private String url;
    private String extension;

    @JsonBackReference(value = "provider-media")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_provider", referencedColumnName = "id_provider")
    private Provider provider;

    @JsonBackReference(value = "certificate-media")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_certificate")
    private Certificate certificate;

    @JsonBackReference(value = "vegetable-media")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vegetable")
    private Vegetable vegetable;
}
