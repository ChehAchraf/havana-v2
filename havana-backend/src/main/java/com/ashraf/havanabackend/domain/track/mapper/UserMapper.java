package com.ashraf.havanabackend.domain.track.mapper;

import com.ashraf.havanabackend.domain.iam.model.User;
import com.ashraf.havanabackend.domain.track.dto.UserRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id" , ignore = true)
    User toEntity(UserRequestDTO dto);



}
