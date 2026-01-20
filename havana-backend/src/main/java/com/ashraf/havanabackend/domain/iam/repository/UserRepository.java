package com.ashraf.havanabackend.domain.iam.repository;

import com.ashraf.havanabackend.domain.iam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    // find user by email
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
