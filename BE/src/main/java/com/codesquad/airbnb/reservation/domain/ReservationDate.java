package com.codesquad.airbnb.reservation.domain;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDate {

    @NotNull
    private LocalDate checkInDate = LocalDate.MIN;

    @NotNull
    private LocalDate checkOutDate = LocalDate.MAX;
}
