package com.ashraf.havanabackend.domain.track.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tracks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "track_name" , nullable = false)
    private String trackName;

    @Column(name = "description" , nullable = false)
    private String description;

    @Column(name = "artiste",nullable = false)
    private String artiste;

    @Column(name = "file_path",nullable = false)
    private String filePath;


}
