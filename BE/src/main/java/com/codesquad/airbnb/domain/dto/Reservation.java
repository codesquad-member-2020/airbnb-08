package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Reservation {

    private final Bill bill;

    private final Review review;
}
