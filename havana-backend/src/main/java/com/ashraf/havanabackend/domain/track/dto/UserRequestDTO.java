package com.ashraf.havanabackend.domain.track.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

public record UserRequestDTO(
        @NotEmpty @Min(3)
        String username,
        @NotEmpty @Min(3)
        String first_name,
        @Email
        String email,
        @Min(5) @Max(16)
        String password
) {
}
