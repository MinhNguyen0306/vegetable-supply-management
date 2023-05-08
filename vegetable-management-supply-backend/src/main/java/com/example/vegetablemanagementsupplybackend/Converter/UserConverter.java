package com.example.vegetablemanagementsupplybackend.Converter;

import com.example.vegetablemanagementsupplybackend.DTO.UserDto;
import com.example.vegetablemanagementsupplybackend.Entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {
    @Autowired
    private ModelMapper modelMapper;

    public UserDto userToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User dtoToUser(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
