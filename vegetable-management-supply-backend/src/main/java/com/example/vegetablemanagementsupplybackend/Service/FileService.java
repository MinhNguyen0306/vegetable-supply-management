package com.example.vegetablemanagementsupplybackend.Service;

import com.example.vegetablemanagementsupplybackend.DTO.MediaDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface FileService {
    String uploadFile(String path, MultipartFile file) throws IOException;
    InputStream getResourceFile(String path, String fileName) throws IOException;

    // Upload on cloudinary
    String uploadFileCloudinary(MultipartFile multipartFile) throws IOException;
}