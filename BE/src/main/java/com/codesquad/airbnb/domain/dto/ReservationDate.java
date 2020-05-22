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

    public void checkInput() {
        validCheckInDate();
        validCheckOutDate();
    }

    private void validCheckInDate() {
        if(checkInDate.equals(LocalDate.MIN)) {
            throw new IllegalArgumentException("Please Input Check-In-Date!");
        }
    }

    private void validCheckOutDate() {
        if(checkOutDate.equals(LocalDate.MAX)) {
            throw new IllegalArgumentException("Please Input Check-Out-Date!");
        }
    }
}
