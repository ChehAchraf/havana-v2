package com.ashraf.havanabackend.cotroller;

import com.ashraf.havanabackend.dto.TrackDTO;
import com.ashraf.havanabackend.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/tracks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TrackController {

    private final TrackService trackService;

    @GetMapping
    public ResponseEntity<Page<TrackDTO>> getAllTracks(
            @RequestParam(required = false) String search,
            Pageable pageable
    ) {
        return ResponseEntity.ok(trackService.getAllTracks(search, pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackDTO> createTrack(
            @RequestPart("track") TrackDTO trackDTO,
            @RequestPart("audioFile") MultipartFile audioFile,
            @RequestPart(value = "coverFile", required = false) MultipartFile coverFile
    ) throws IOException {
        return ResponseEntity.ok(trackService.saveTrack(trackDTO, audioFile, coverFile));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackDTO> updateTrack(
            @PathVariable Long id,
            @RequestPart("track") TrackDTO trackDTO,
            @RequestPart(value = "audioFile", required = false) MultipartFile audioFile,
            @RequestPart(value = "coverFile", required = false) MultipartFile coverFile
    ) throws IOException {
        return ResponseEntity.ok(trackService.saveTrack(trackDTO, audioFile, coverFile));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        trackService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                String contentType = "application/octet-stream";
                try {
                    contentType = java.nio.file.Files.probeContentType(file);
                } catch (IOException ex) {

                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
