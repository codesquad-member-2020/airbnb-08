package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Main {

    private ReservationDate reservationDate;

    private Guest guest;

    private Budget budget;

    private int numberOfRooms;

    private List<Room> rooms;
}
