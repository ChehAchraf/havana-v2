package com.ashraf.havanabackend.service;

import com.ashraf.havanabackend.repository.TrackReposiotry;

import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TrackService {
    private final TrackReposiotry trackReposiotry;
    private final Path rootLocation = Paths.get("uploads");



}
