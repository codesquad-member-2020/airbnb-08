package com.codesquad.airbnb.room.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Budget {

    private int lowestPrice;

    private int highestPrice = Integer.MAX_VALUE;
}
