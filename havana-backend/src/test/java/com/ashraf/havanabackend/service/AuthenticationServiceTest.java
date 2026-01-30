package com.ashraf.havanabackend.service;

import com.ashraf.havanabackend.config.JwtService;
import com.ashraf.havanabackend.dto.AuthenticationRequest;
import com.ashraf.havanabackend.dto.AuthenticationResponse;
import com.ashraf.havanabackend.dto.RegisterRequest;
import com.ashraf.havanabackend.entity.User;
import com.ashraf.havanabackend.enums.Role;
import com.ashraf.havanabackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    JwtService jwtService;

    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    AuthenticationService authenticationService;


    @Test
    void userShoulBeAbleToRegister() {
        var userToRegister = new RegisterRequest("test_user","justatest@gmail.com","test12345678", Role.ROLE_USER);
        var athenticateduser = new AuthenticationRequest("justatest@gmail.com","test12345678");
        var savedUser = User.builder().username("sha9or").email("test@mail.com").build();

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtService.generateToken(any(User.class))).thenReturn("fake-jwt-token");

        AuthenticationResponse response = authenticationService.authenticate(athenticateduser);

        assertNotNull(response);

        assertEquals("fake-jwt-token", response.getToken());

        verify(userRepository).save(any(User.class));
    }

    @Test
    void authenticate() {
    }
}