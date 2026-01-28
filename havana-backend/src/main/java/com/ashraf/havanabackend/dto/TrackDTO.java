package com.ashraf.havanabackend.dto;

public record TrackDTO(
        Long id,
        String title,
        String artist,
        String description,
        String genre,
        Integer duration,
        String filePath,
        String coverPath
) {
}
