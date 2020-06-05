package com.codesquad.airbnb.room.domain;

import lombok.*;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
public class Budget {

    @PositiveOrZero
    @Digits(integer = 10, fraction = 0)
    private int lowestPrice;

    @Positive
    @Digits(integer = 10, fraction = 0)
    private int highestPrice = Integer.MAX_VALUE;

    @AssertTrue
    private boolean isBiggerThanLowestPrice() {
        return this.highestPrice > this.lowestPrice;
    }
}
