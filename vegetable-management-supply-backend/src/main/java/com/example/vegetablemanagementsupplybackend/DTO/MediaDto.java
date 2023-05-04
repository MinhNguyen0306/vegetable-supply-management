package com.example.vegetablemanagementsupplybackend.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MediaDto {
    private int id;
    private String mediaName;
    private String url;
    private String extension;
}
