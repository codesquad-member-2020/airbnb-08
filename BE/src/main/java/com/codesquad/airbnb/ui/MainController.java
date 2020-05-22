package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.domain.dto.Budget;
import com.codesquad.airbnb.domain.dto.Guest;
import com.codesquad.airbnb.domain.dto.Main;
import com.codesquad.airbnb.domain.dto.ReservationDate;
import com.codesquad.airbnb.infra.dao.ViewDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

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
    public Main showPriceStatistics(@Valid ReservationDate reservationDate) {
        return null;
    }
}
