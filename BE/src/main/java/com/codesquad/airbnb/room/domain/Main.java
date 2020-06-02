package com.codesquad.airbnb.room.domain;

import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
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

    private final List<RoomDetail> rooms;
}
