package com.example.vegetablemanagementsupplybackend.Service.Impl;

import com.example.vegetablemanagementsupplybackend.Converter.MediaConverter;
import com.example.vegetablemanagementsupplybackend.Converter.VegetableConverter;
import com.example.vegetablemanagementsupplybackend.DTO.ResponsePayload.VegetableResponse;
import com.example.vegetablemanagementsupplybackend.DTO.VegetableDto;
import com.example.vegetablemanagementsupplybackend.Entity.Media;
import com.example.vegetablemanagementsupplybackend.Entity.Provider;
import com.example.vegetablemanagementsupplybackend.Entity.Vegetable;
import com.example.vegetablemanagementsupplybackend.Enum.ProviderStatusEnum;
import com.example.vegetablemanagementsupplybackend.Exception.ResourceNotFoundException;
import com.example.vegetablemanagementsupplybackend.Repository.MediaRepository;
import com.example.vegetablemanagementsupplybackend.Repository.ProviderRepository;
import com.example.vegetablemanagementsupplybackend.Repository.VegetableRepository;
import com.example.vegetablemanagementsupplybackend.Service.FileService;
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
    private FileService fileService;

    private final VegetableConverter vegetableConverter;
    private final MediaConverter mediaConverter;
    @Value("${project.image}")
    private String path;

    @Override
    public VegetableDto createVegetable(String providerId, MultipartFile file, VegetableDto vegetableDto) {
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "Id", providerId));
        Vegetable vegetable = vegetableConverter.dtoToVegetable(vegetableDto);
        List<Vegetable> vegetables = this.vegetableRepository.findAll();
        boolean existed = vegetables.stream().anyMatch(vegetable1 -> vegetable1 == vegetable);
        if(existed) {
            return null;
        }
        boolean checkProvider = provider.getStatus().equals(ProviderStatusEnum.ACTIVE);
        if(!checkProvider) {
            return null;
        }
        vegetable.setProvider(provider);
        Vegetable savedVegetable = this.vegetableRepository.save(vegetable);
        if(file != null) {
            try {
                String fileName = fileService.uploadFile(path, file);
                Optional<String> extensionOptional = FileUtil.getExtensionByStringHandling(fileName);
                if(extensionOptional.isPresent()) {
                    String extension = extensionOptional.get();
                    Media media = new Media();
                    String originalName = file.getOriginalFilename();
                    String mediaName = originalName.substring(0, originalName.lastIndexOf("."));
                    media.setUrl(fileName);
                    media.setMediaName(mediaName);
                    media.setExtension(extension);
                    media.setVegetable(savedVegetable);
                    this.mediaRepository.save(media);
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return vegetableConverter.vegetableToDto(savedVegetable);
    }

    @Override
    public VegetableDto updateVegetable(String vegetableId, VegetableDto vegetableDto) {
        Vegetable vegetable = this.vegetableRepository.findById(vegetableId)
                .orElseThrow(() -> new ResourceNotFoundException("Vegetable", "Id", vegetableId));
        vegetable.setVegetableName(vegetableDto.getVegetableName());
        vegetable.setCurrentPricing(vegetableDto.getCurrentPricing());
        vegetable.setCategory(vegetableDto.getCategory());
        vegetable.setCertificates(vegetableDto.getCertificates());
        vegetable.setUnits(vegetableDto.getUnits());
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
