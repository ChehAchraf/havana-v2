package com.ashraf.havanabackend.repository;

import com.ashraf.havanabackend.entity.Track;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {

    Page<Track> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(String title, String artist, Pageable pageable);

}
