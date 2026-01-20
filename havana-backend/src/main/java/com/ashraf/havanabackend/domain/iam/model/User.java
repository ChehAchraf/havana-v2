package com.ashraf.havanabackend.domain.iam.model;

import com.ashraf.havanabackend.domain.iam.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String first_name;
    private String last_name;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String password;


}
