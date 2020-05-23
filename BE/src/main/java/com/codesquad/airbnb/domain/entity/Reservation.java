package com.codesquad.airbnb.domain.entity;

import com.codesquad.airbnb.domain.dto.Guest;
import com.codesquad.airbnb.domain.dto.ReservationDate;
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
