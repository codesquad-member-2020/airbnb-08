package com.codesquad.airbnb.room.ui;

import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.room.domain.Budget;
import com.codesquad.airbnb.room.domain.Main;
import com.codesquad.airbnb.room.domain.Statistics;
import com.codesquad.airbnb.common.UtilDAO;
import com.codesquad.airbnb.room.infra.ViewDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final UtilDAO utilDAO;

    private final ViewDAO viewDAO;

    @GetMapping("")
    public Main showMain(ReservationDate reservationDate,
                         @Valid Guest guest,
                         @Valid Budget budget) {

        reservationDate.validateReservationDate();
        return viewDAO.main(utilDAO, reservationDate, guest, budget);
    }

    @GetMapping("/budget")
    public Statistics showPriceStatistics(@Valid ReservationDate reservationDate) {
        return viewDAO.showStatistics(reservationDate);
    }
}
