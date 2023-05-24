package com.example.vegetablemanagementsupplybackend.Controller;

import com.example.vegetablemanagementsupplybackend.DTO.UnitDto;
import com.example.vegetablemanagementsupplybackend.Service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/units")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @GetMapping
    public ResponseEntity<List<UnitDto>> getAllUnit() {
        List<UnitDto> unitDtoList = this.unitService.getAllUnits();
        return ResponseEntity.ok(unitDtoList);
    }

    @GetMapping("/vegetable/{vegetableId}")
    public ResponseEntity<List<UnitDto>> getAllUnitOfVegetable(@PathVariable String vegetableId) {
        List<UnitDto> unitDtoList = this.unitService.getAllUnitOfVegetable(vegetableId);
        return ResponseEntity.ok(unitDtoList);
    }

}
