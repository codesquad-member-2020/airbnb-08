package com.codesquad.airbnb.reservation.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class Guest {

    private int numberOfAdults;

    private int numberOfKids;

    private int numberOfBabies;

    public void checkInput() {
        if(numberOfAdults == 0 && numberOfKids == 0 && numberOfBabies == 0) {
            throw new IllegalArgumentException("Please Input Guests!");
        }
    }
}
