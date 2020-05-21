package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class Price {

    private int originPrice;

    private int salesPrice;

    private int totalPrice;
}
