package com.codesquad.airbnb.room.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Price {

    private int originPrice;

    private int salesPrice;

    private int totalPrice;
}
