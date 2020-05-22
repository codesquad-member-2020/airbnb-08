package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Main {

    private final ReservationDate reservationDate;

    private final Guest guest;

    private final Budget budget;

    private final int numberOfRooms;

    private final List<RoomDTO> rooms;
}
