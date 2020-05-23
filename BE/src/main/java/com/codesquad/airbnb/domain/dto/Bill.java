package com.codesquad.airbnb.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Bill {

    private int salesPrice;

    private int lengthOfStay;

    private int priceWithoutFee;

    private int cleaningFee;

    private int securityDeposit;

    private int priceWithFee;
}
