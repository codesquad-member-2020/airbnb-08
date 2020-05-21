package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Room {

    private Long roomdId;

    private String roomName;

    private String country;

    private double reviewScoresRating;

    private List<Price> price;

    private List<Media> medias;

    private String badge;

    private boolean available;
}
