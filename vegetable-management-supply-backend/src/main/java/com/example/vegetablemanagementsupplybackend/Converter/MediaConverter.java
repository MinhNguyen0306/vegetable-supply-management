package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.MediaDto;
import com.example.vegetablemanagementsupplybackend.Entity.Media;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MediaConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Media dtoToMedia(MediaDto mediaDto) {
        return modelMapper.map(mediaDto, Media.class);
    }

    public MediaDto mediaToDto(Media media) {
        return modelMapper.map(media, MediaDto.class);
    }
}
