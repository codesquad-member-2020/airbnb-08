package com.codesquad.airbnb.domain.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDate {

    private LocalDate checkInDate = LocalDate.MIN;

    private LocalDate checkOutDate = LocalDate.MAX;

    public boolean isBudgetSet() {
        return !checkInDate.equals(LocalDate.MIN);
    }
}
