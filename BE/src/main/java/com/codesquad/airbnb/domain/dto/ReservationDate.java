package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ReservationDate {

    private final LocalDate checkInDate;

    private final LocalDate checkOutDate;
}
