package com.codesquad.airbnb.reservation.domain;

import com.codesquad.airbnb.common.exception.IllegalReservationDateException;
import lombok.*;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDate {

    @NotNull(message = "Please provide a date")
    @FutureOrPresent
    private LocalDate checkInDate = LocalDate.now();

    @NotNull(message = "Please provide a date")
    @FutureOrPresent
    private LocalDate checkOutDate = LocalDate.now();

    @AssertTrue
    private boolean isAfterThanCheckInDate() {
        if(checkOutDate.isBefore(checkInDate)) {
            throw new IllegalReservationDateException("체크아웃 날짜를 확인해주세요");
        }

        return true;
    }

    public void validateReservationDate() {
        validateCheckInDate();
        isAfterThanCheckInDate();
    }

    private void validateCheckInDate() {
        if(checkInDate.isBefore(LocalDate.now())) {
            throw new IllegalReservationDateException("체크인 날짜를 확인해주세요");
        }
    }
}
