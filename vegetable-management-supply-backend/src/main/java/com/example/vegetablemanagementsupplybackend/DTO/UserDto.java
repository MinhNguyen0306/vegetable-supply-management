package com.example.vegetablemanagementsupplybackend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @NotEmpty
    @Size(min = 4, max = 16, message = "Password must be min of 4 chars and max of 10 chars!")
    private String password;
}
