package com.ashraf.havanabackend.service;

import com.ashraf.havanabackend.dto.TrackDTO;
import com.ashraf.havanabackend.mapper.TrackMapper;
import com.ashraf.havanabackend.entity.Track;
import com.ashraf.havanabackend.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor 
public class TrackService {

    private final TrackRepository repository; 
    private final TrackMapper mapper; 

    private final Path rootLocation = Paths.get("uploads");

    {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le dossier uploads !");
        }
    }

    public Page<TrackDTO> getAllTracks(String search, Pageable pageable) {
        Page<Track> tracks;

        if (search != null && !search.isBlank()) {
            tracks = repository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(search, search, pageable);
        } else {
            tracks = repository.findAll(pageable);
        }

        return tracks.map(mapper::toDTO);
    }

    @Transactional
    public TrackDTO saveTrack(TrackDTO trackDTO, MultipartFile audioFile, MultipartFile coverFile) throws IOException {
        Track track = mapper.toEntity(trackDTO);

        if (audioFile != null && !audioFile.isEmpty()) {
            String audioName = saveFile(audioFile);
            track.setFilePath(audioName);
        }
        if (coverFile != null && !coverFile.isEmpty()) {
            String coverName = saveFile(coverFile);
            track.setCoverPath(coverName);
        }

        Track savedTrack = repository.save(track);
        return mapper.toDTO(savedTrack);
    }

    public void deleteTrack(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Track not found!");
        }
        repository.deleteById(id);
    }

    private String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
        return filename;
    }
}