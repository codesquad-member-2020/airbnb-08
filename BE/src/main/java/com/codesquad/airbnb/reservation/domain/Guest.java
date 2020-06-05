package com.codesquad.airbnb.reservation.domain;

import lombok.*;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
@ToString
public class Guest {

    @Positive
    @Digits(integer = 2, fraction = 0)
    private int numberOfAdults;

    @PositiveOrZero
    @Digits(integer = 2, fraction = 0)
    private int numberOfKids;

    @PositiveOrZero
    @Digits(integer = 2, fraction = 0)
    private int numberOfBabies;
}
