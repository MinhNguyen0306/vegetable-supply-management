package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.Service.UploadFileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("api/v1/file")
public class StorageFileController {
    @Value("${project.image}")
    private String path;

    private final UploadFileService uploadFileService;

    public StorageFileController(UploadFileService uploadFileService) {
        this.uploadFileService = uploadFileService;
    }

    @GetMapping(value = "/download/{fileName}", produces = "*/*")
    public void getFileResource(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        InputStream resource = this.uploadFileService.getResourceFile(path, fileName);
        response.setContentType("*/*");
        StreamUtils.copy(resource, response.getOutputStream());
    }

//    @GetMapping(value = "download/{fileName}", produces = {"image/*"})
//    public ResponseEntity<UploadFileResponse> downLoadFile(
//        @PathVariable String fileName,
//        HttpServletRequest request
//    ) throws IOException {
//        Resource resource = uploadFileService.loadFileAsResource(fileName);
//        String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//        if(contentType == null) {
//            contentType = "application/octet-stream";
//        }
//
//        UploadFileResponse response = UploadFileResponse.builder()
//                .fileContentType(contentType)
//                .fileSize(resource.contentLength())
//                .fileName(fileName)
//                .fileDownloadUri(request.getRequestURI())
//                .build();
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION)
//                .body(response);
//    }
}
