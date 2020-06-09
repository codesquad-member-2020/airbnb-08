package com.codesquad.airbnb.reservation.domain;

import lombok.*;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
@NoArgsConstructor
public class Guest {

    @Positive
    @Digits(integer = 2, fraction = 0)
    private int numberOfAdults = 1;

    @PositiveOrZero
    @Digits(integer = 2, fraction = 0)
    private int numberOfKids;

    @PositiveOrZero
    @Digits(integer = 2, fraction = 0)
    private int numberOfBabies;
}
