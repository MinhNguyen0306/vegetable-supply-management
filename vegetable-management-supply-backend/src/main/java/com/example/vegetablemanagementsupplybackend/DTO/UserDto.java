package com.example.vegetablemanagementsupplybackend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class UserDto {
    private String id;

    @NotEmpty
    @Size(min = 4, message = "Username must be min of 4 characters!")
    private String userName;

    @Email(message = "Email address is not valid!")
    private String email;

    @NotEmpty
    private String address;

    @Pattern(regexp = "/(84[3|5|7|8|9])+([0-9]{8})\\b/g")
    private String phone;
    private ProviderDto provider;
    private MartDto mart;
    private Set<RoleDto> roleDtoSet;
}
