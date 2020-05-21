package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReservationDate {

    private LocalDateTime checkInDate;

    private LocalDateTime checkOutDate;
}
