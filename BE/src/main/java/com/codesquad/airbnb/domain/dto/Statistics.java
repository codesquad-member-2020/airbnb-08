package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {

    private int lowestPrice;

    private int highestPrice;

    private int averagePrice;

    private List<Integer> prices;

    private int[] counts;
}
