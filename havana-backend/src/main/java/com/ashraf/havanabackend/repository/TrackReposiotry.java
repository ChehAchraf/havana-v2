package com.ashraf.havanabackend.repository;

import com.ashraf.havanabackend.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackReposiotry extends JpaRepository<Track, Long> {

}
