package com.example.vegetablemanagementsupplybackend.Service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface UploadFileService {
    String uploadFile(String path, MultipartFile file) throws IOException;

    InputStream getResourceFile(String path, String fileName) throws IOException;

    // Upload on cloudinary
    String uploadFileCloudinary(MultipartFile multipartFile) throws IOException;
    Resource loadFileAsResource(String fileName) throws IOException;
}
