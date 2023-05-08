package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.ApiResponse;
import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Service.VegetableService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/vegetable")
@Slf4j
public class VegetableController {
    @Autowired
    private VegetableService vegetableService;

    @PostMapping("/")
    public ResponseEntity<VegetableDto> createVegetable(
            @RequestParam(name = "providerId") String providerId,
            @RequestParam(name = "avatar")MultipartFile file,
            @RequestBody VegetableDto vegetableDto
    ) {
        VegetableDto createdVegetable = this.vegetableService.createVegetable(providerId, file, vegetableDto);
        if(createdVegetable == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdVegetable, HttpStatus.CREATED);
    }

    @PostMapping("/{vegetableId}")
    public ResponseEntity<VegetableDto> updateVegetable(
            @PathVariable String vegetableId,
            @RequestBody VegetableDto vegetableDto
    ) {
        VegetableDto updatedVegetable = this.vegetableService.updateVegetable(vegetableId, vegetableDto);
        return new ResponseEntity<>(updatedVegetable, HttpStatus.OK);
    }

    @GetMapping("/{vegetableId}")
    public ResponseEntity<VegetableDto> getVegetableById(@PathVariable String vegetableId) {
        VegetableDto vegetableDto = this.vegetableService.getVegetableById(vegetableId);
        return ResponseEntity.ok(vegetableDto);
    }

    @GetMapping("/")
    public ResponseEntity<VegetableResponse> getAllVegetables(
        @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
        @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
        @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
        @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        VegetableResponse vegetableResponse = this.vegetableService.getAllVegetables(pageNumber, pageSize, sortBy, sortDir);
        if(vegetableResponse == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(vegetableResponse);
    }

    @DeleteMapping("/{vegetableId}")
    public ResponseEntity<ApiResponse> deleteVegetable(@PathVariable String vegetableId) {
        this.vegetableService.deleteVegetable(vegetableId);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Delete vegetable success!"), HttpStatus.OK);
    }
}
