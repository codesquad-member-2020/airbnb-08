package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Guest {

    private int numberOfAdults;

    private int numberOfKids;

    private int numberOfBabies;
}
