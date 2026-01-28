package com.ashraf.havanabackend.mapper;

import com.ashraf.havanabackend.dto.TrackDTO;
import com.ashraf.havanabackend.entity.Track;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrackMapper {

    TrackDTO toDTO(Track track);

    Track toEntity(TrackDTO trackDTO);

}
