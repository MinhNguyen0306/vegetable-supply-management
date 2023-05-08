package com.example.vegetablemanagementsupplybackend.Controller;

import com.cloudinary.Cloudinary;
import com.example.vegetablemanagementsupplybackend.Service.FileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("api/file")
public class FileController {

    @Autowired
    private FileService fileService;
    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/image/{imageName}")
    public void getImageResource(@PathVariable String imageName, HttpServletResponse response) throws IOException {
    }
}
