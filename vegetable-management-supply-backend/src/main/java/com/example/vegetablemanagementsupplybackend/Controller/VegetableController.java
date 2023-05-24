package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.RestApiResponse;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Enum.VegetableFilterEnum;
import com.example.vegetablemanagementsupplybackend.Service.VegetableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/vegetable")
@Slf4j
public class VegetableController {
    @Autowired
    private VegetableService vegetableService;

    @PostMapping
    @Operation(
        summary = "Create a vegetable",
        description = "Provider insert a vegetable",
        tags = {"Vegetable"}
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Success, new vegetable inserted.",
            content = {
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = VegetableDto.class)
                )
            }
        ),
        @ApiResponse(responseCode = "400", description = "Bad request")}
    )
    public ResponseEntity<?> createVegetable(
        @RequestParam(name = "providerId") String providerId,
        @RequestParam(name = "categoryId") Integer categoryId,
        @RequestParam(name = "units") List<String> units,
        @RequestParam(name = "medias")MultipartFile[] files,
        @RequestParam(value = "uploadTo", defaultValue = AppConstants.UPLOAD_SERVER, required = false) String uploadTo,
        @RequestPart("vegetable") VegetableDto vegetableDto
    ) {
        VegetableDto createdVegetable = this.vegetableService.createVegetable(
                providerId, categoryId, units, files, uploadTo, vegetableDto);
        if(createdVegetable == null) {
            return new ResponseEntity<>(new RestApiResponse(false, "Request is not eligible"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdVegetable, HttpStatus.CREATED);
    }


    @PostMapping("/{vegetableId}")
    @Operation(
        summary = "Update vegetable information",
        description = "Update several info of vegetable ordinary as current price",
        tags = {"Vegetable"}
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Update info vegetable successfully",
            content = {
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = VegetableDto.class)
                )
            }
        ),
        @ApiResponse(responseCode = "400", description = "Bad request")}
    )
    public ResponseEntity<VegetableDto> updateVegetable(
        @PathVariable String vegetableId,
        @RequestBody VegetableDto vegetableDto
    ) {
        VegetableDto updatedVegetable = this.vegetableService.updateVegetable(vegetableId, vegetableDto);
        if(vegetableDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedVegetable, HttpStatus.OK);
    }


    @GetMapping("/{vegetableId}")
    public ResponseEntity<VegetableDto> getVegetableById(@PathVariable String vegetableId) {
        VegetableDto vegetableDto = this.vegetableService.getVegetableById(vegetableId);
        return ResponseEntity.ok(vegetableDto);
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MART')")
    @GetMapping
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

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<VegetableResponse> getVegetablesByProvider(
            @PathVariable("providerId") String providerId,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        VegetableResponse vegetableResponse = this.vegetableService.getVegetablesByProvider(
                providerId, pageNumber, pageSize, sortBy, sortDir);
        if(vegetableResponse == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(vegetableResponse);
    }

    @GetMapping("provider/{providerId}/type/{type}")
    public ResponseEntity<VegetableResponse> getVegetablesOfProviderByType(
            @PathVariable("providerId") String providerId,
            @PathVariable("type") VegetableFilterEnum type,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        VegetableResponse vegetableResponse = this.vegetableService.getVegetablesByType(
                providerId, type, pageNumber, pageSize, sortBy, sortDir);
        if(vegetableResponse == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(vegetableResponse);
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<VegetableResponse> getVegetablesByKeySearch(
            @PathVariable("key") String key,
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir
    ) {
        VegetableResponse vegetableResponse = this.vegetableService.getVegetablesByKeySearch(
                key, pageNumber, pageSize, sortBy, sortDir);
        if(vegetableResponse == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(vegetableResponse);
    }

    @DeleteMapping("/{vegetableId}")
    public ResponseEntity<RestApiResponse> deleteVegetable(@PathVariable String vegetableId) {
        this.vegetableService.deleteVegetable(vegetableId);
        return new ResponseEntity<RestApiResponse>(new RestApiResponse(true, "Delete vegetable success!"), HttpStatus.OK);
    }

    @PatchMapping("/lock/{vegetableId}")
    public ResponseEntity<RestApiResponse> lockVegetable(@PathVariable String vegetableId) {
        this.vegetableService.lockVegetable(vegetableId);
        return new ResponseEntity<>(new RestApiResponse(true, "Lock vegetable success!"), HttpStatus.OK);
    }
}
