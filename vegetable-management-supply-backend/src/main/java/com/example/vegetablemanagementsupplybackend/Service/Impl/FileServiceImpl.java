package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.cloudinary.Cloudinary;
import com.example.vegetablemanagementsupplybackend.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {
        String name = file.getOriginalFilename();

        String randomID = UUID.randomUUID().toString();
        String fileName1 =randomID.concat(name.substring(name.lastIndexOf(".")));

        String filePath = path + File.separator + fileName1;

        File f = new File(path);
        if(!f.exists()) {
            f.mkdir();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath));

        return fileName1;
    }

    @Override
    public InputStream getResourceFile(String path, String fileName) throws IOException {
        String fullPath = path + File.separator + fileName;
        InputStream inputStream = new FileInputStream(fullPath);
        return inputStream;
    }

    @Override
    public String uploadFileCloudinary(MultipartFile multipartFile) throws IOException {
        return cloudinary.uploader()
                .upload(multipartFile.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();
    }
}
