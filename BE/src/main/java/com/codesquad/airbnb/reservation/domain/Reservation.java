package com.codesquad.airbnb.reservation.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    private Long userId;

    private Long roomId;

    private List<ReservationDate> reservationDates;

    private List<Guest> guests;
}
