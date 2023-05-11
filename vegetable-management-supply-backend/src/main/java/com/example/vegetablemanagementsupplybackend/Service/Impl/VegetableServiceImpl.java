package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.Converter.VegetableConverter;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Entity.*;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Exception.DuplicateException;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Exception.UploadFileException;
import com.example.vegetablemanagementsupplybackend.Repository.*;
import com.example.vegetablemanagementsupplybackend.Service.UploadFileService;
import com.example.vegetablemanagementsupplybackend.Service.VegetableService;
import com.example.vegetablemanagementsupplybackend.Util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VegetableServiceImpl implements VegetableService {

    @Autowired
    private VegetableRepository vegetableRepository;
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private UploadFileService uploadFileService;

    private final VegetableConverter vegetableConverter;
    @Value("${project.image}")
    private String path;

    @Override
    public VegetableDto createVegetable(
            String providerId,
            Integer categoryId,
            Integer unitId,
            MultipartFile[] files,
            String uploadTo,
            VegetableDto vegetableDto
    ) {
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "Id", providerId));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Id", categoryId));
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("unit", "Id", unitId));

        // Convert vegetable sang vegetableDto
        Vegetable vegetable = vegetableConverter.dtoToVegetable(vegetableDto);

        // Kiểm tra xem sản phẩm đã tồn tại chưa
        List<Vegetable> vegetables = provider.getVegetables();
        boolean existed = vegetables.stream()
                .anyMatch(existedVegetable -> existedVegetable.getVegetableName() == vegetable.getVegetableName());
        if(existed) {
            throw new DuplicateException(Vegetable.class.getName(), "ALL", "Vegetable Object");
        }

        // Kiểm tra tài khoản provider có active không
        boolean checkProvider = provider.getStatus().equals(ProviderStatusEnum.ACTIVE);
        if(!checkProvider) {
            return null;
        }
        vegetable.setProvider(provider);
        vegetable.setCategory(category);
        vegetable.setUnit(unit);
        Vegetable savedVegetable = this.vegetableRepository.save(vegetable);

        // Thực hiện lưu trữ ảnh của sản phẩm
        Arrays.stream(files).forEach(file -> {
            if(file != null) {
                String fileName = "";
                Media media = new Media();
                String originalName = file.getOriginalFilename();
                Optional<String> extensionOptional = FileUtil.getExtensionByStringHandling(originalName);
                String mediaName = originalName.substring(0, originalName.lastIndexOf("."));
                if(extensionOptional.isPresent()) {
                    String extension = extensionOptional.get();
                    media.setExtension(extension);
                    media.setMediaName(mediaName);
                    media.setVegetable(savedVegetable);
                    try {
                        // Chọn upload lên server
                        if(uploadTo.equalsIgnoreCase(AppConstants.UPLOAD_SERVER)) {
                            fileName = uploadFileService.uploadFile(path, file);
                        }
                        // Chọn upload lên cloudinary
                        else {
                            fileName = uploadFileService.uploadFileCloudinary(file);
                        }
                    } catch (IOException e) {
                        throw new UploadFileException(originalName);
                    }

                    media.setUrl(fileName);
                    this.mediaRepository.save(media);
                }
            }
        });

        return vegetableConverter.vegetableToDto(savedVegetable);
    }

    @Override
    public VegetableDto updateVegetable(String vegetableId, VegetableDto vegetableDto) {
        Vegetable vegetable = this.vegetableRepository.findById(vegetableId)
                .orElseThrow(() -> new ResourceNotFoundException("Vegetable", "Id", vegetableId));
        Vegetable vegetableConverted = vegetableConverter.dtoToVegetable(vegetableDto);
        vegetable.setVegetableName(vegetableConverted.getVegetableName());
        vegetable.setCurrentPricing(vegetableConverted.getCurrentPricing());
        vegetable.setCategory(vegetableConverted.getCategory());
        vegetable.setUnit(vegetableConverted.getUnit());
        vegetable.setCertificates(vegetableConverted.getCertificates());
        Vegetable updatedVegetable = this.vegetableRepository.save(vegetable);
        return vegetableConverter.vegetableToDto(updatedVegetable);
    }

    @Override
    public VegetableDto getVegetableById(String vegetableId) {
        Vegetable vegetable = this.vegetableRepository.findById(vegetableId)
                .orElseThrow(() -> new ResourceNotFoundException("Vegetable", "Id", vegetableId));
        return vegetableConverter.vegetableToDto(vegetable);
    }

    @Override
    public VegetableResponse getAllVegetables(
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Vegetable> page = this.vegetableRepository.findAll(pageable);

        List<Vegetable> vegetables = page.getContent();
        List<VegetableDto> vegetableDtoList = vegetableConverter.vegetablesToDto(vegetables);

        VegetableResponse response = new VegetableResponse();
        response.setPageNumber(pageNumber);
        response.setPageSize(pageSize);
        response.setVegetableDtoList(vegetableDtoList);
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLastPage(page.isLast());

        return response;
    }

    @Override
    public void deleteVegetable(String vegetableId) {
        Vegetable vegetable = this.vegetableRepository.findById(vegetableId)
                .orElseThrow(() -> new ResourceNotFoundException("Vegetable", "Id", vegetableId));
        this.vegetableRepository.delete(vegetable);
    }
}
