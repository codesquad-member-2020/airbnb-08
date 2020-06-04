package com.codesquad.airbnb.reservation.domain;

import lombok.*;

import javax.validation.constraints.Min;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
@ToString
public class Guest {

    @Min(1)
    private int numberOfAdults;

    private int numberOfKids;

    private int numberOfBabies;
}
