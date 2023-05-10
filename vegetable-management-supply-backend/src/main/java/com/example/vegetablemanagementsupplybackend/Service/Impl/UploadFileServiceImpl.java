package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.cloudinary.Cloudinary;
import com.example.vegetablemanagementsupplybackend.Service.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
public class UploadFileServiceImpl implements UploadFileService {

    @Value("${project.image}")
    private String path;

    private Path foundFile;

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
                .upload(
                    multipartFile.getBytes(),
                    Map.of(
                        "public_id", UUID.randomUUID().toString(),
                        "resource_type", "auto"
                    )
                )
                .get("url")
                .toString();
    }

    @Override
    public Resource loadFileAsResource(String fileName) throws IOException {
        Path uploadDirectory = Paths.get(path);

        Files.list(uploadDirectory).forEach(file -> {
            if(file.getFileName().toString().startsWith(fileName)) {
                foundFile = file;
                return;
            }
        });

        if(foundFile != null) {
            return new UrlResource(foundFile.toUri());
        }

        return null;
    }
}
