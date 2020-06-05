package com.codesquad.airbnb.room.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RoomDetail {

    private Long roomId;

    private String roomName;

    private String country;

    private double reviewScoresRating;

    private Price price;

    private List<String> medias;

    private String badge;

    private boolean available;
}
