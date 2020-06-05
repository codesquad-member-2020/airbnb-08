package com.codesquad.airbnb.room.domain;

import lombok.*;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Min;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Budget {

    @Min(0)
    private int lowestPrice;

    private int highestPrice = Integer.MAX_VALUE;

    @AssertTrue
    private boolean validateBudget() {
        return highestPrice > lowestPrice;
    }
}
