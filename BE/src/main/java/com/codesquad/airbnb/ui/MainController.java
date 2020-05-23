package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.domain.dto.*;
import com.codesquad.airbnb.domain.dto.Reservation;
import com.codesquad.airbnb.infra.dao.ViewDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final ViewDAO viewDAO;

    @GetMapping("")
    public Main showMain(@Valid ReservationDate reservationDate,
                         @Valid Guest guest,
                         @Valid Budget budget) {

        return viewDAO.main(reservationDate, guest, budget);
    }

    @GetMapping("/budget")
    public Statistics showPriceStatistics(@Valid ReservationDate reservationDate) {
        reservationDate.checkInput();
        return viewDAO.showStatistics(reservationDate);
    }

    @GetMapping("/reservations")
    public Reservation showBillAndReview(@RequestParam Long roomId, @Valid ReservationDate reservationDate, @Valid Guest guest) {
        reservationDate.checkInput();
        guest.checkInput();
        return viewDAO.showBillAndReview(roomId, reservationDate, guest);
    }
}
