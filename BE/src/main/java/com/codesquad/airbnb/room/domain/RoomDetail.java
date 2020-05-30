package com.codesquad.airbnb.room.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class RoomDetail {

    private Long roomdId;

    private String roomName;

    private String country;

    private double reviewScoresRating;

    private Price price;

    private List<String> medias;

    private String badge;

    private boolean available;
}
