package com.codesquad.airbnb.room.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Statistics {

    private int lowestPrice;

    private int highestPrice;

    private int averagePrice;

    private List<Integer> prices;

    private int[] counts;
}
