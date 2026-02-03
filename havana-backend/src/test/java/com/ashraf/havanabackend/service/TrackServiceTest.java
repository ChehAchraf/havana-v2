package com.ashraf.havanabackend.service;

import com.ashraf.havanabackend.dto.TrackDTO;
import com.ashraf.havanabackend.entity.Track;
import com.ashraf.havanabackend.mapper.TrackMapper;
import com.ashraf.havanabackend.repository.TrackRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TrackServiceTest {

    @Mock
    private TrackRepository repository;

    @Mock
    private TrackMapper mapper;

    @InjectMocks
    private TrackService trackService;

    @Test
    void getAllTracks_ShouldReturnTracks_WhenNoSearch() {
        Pageable pageable = PageRequest.of(0, 10);
        Track track = new Track();
        track.setId(1L);
        TrackDTO trackDTO = new TrackDTO(1L, null, null, null, null, null, null, null);

        Page<Track> trackPage = new PageImpl<>(Collections.singletonList(track));

        when(repository.findAll(pageable)).thenReturn(trackPage);
        when(mapper.toDTO(track)).thenReturn(trackDTO);

        Page<TrackDTO> result = trackService.getAllTracks(null, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(1L, result.getContent().get(0).id());
        verify(repository).findAll(pageable);
    }

    @Test
    void getAllTracks_ShouldSearch_WhenSearchProvided() {
        String query = "test";
        Pageable pageable = PageRequest.of(0, 10);
        Track track = new Track();
        Page<Track> trackPage = new PageImpl<>(Collections.singletonList(track));

        when(repository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(query, query, pageable))
                .thenReturn(trackPage);
        when(mapper.toDTO(track)).thenReturn(new TrackDTO(null, null, null, null, null, null, null, null));

        trackService.getAllTracks(query, pageable);

        verify(repository).findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(query, query, pageable);
    }

    @Test
    void deleteTrack_ShouldDelete_WhenExists() {
        Long id = 1L;
        when(repository.existsById(id)).thenReturn(true);

        trackService.deleteTrack(id);

        verify(repository).deleteById(id);
    }

    @Test
    void deleteTrack_ShouldThrow_WhenNotExists() {
        Long id = 1L;
        when(repository.existsById(id)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> trackService.deleteTrack(id));
        verify(repository, never()).deleteById(any());
    }
}
