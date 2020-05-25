package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.domain.dto.*;
import com.codesquad.airbnb.infra.dao.ReservationDAO;
import com.codesquad.airbnb.infra.dao.UtilDAO;
import com.codesquad.airbnb.infra.dao.ViewDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final UtilDAO utilDAO;

    private final ViewDAO viewDAO;

    private final ReservationDAO reservationDAO;

    @GetMapping("")
    public Main showMain(@Valid ReservationDate reservationDate,
                         @Valid Guest guest,
                         @Valid Budget budget) {

        return viewDAO.main(utilDAO, reservationDate, guest, budget);
    }

    @GetMapping("/budget")
    public Statistics showPriceStatistics(@Valid ReservationDate reservationDate) {
        reservationDate.checkInput();
        return viewDAO.showStatistics(reservationDate);
    }

    @GetMapping("/reservations")
    public Confirmation showBillAndReview(@RequestParam Long roomId, @Valid ReservationDate reservationDate, @Valid Guest guest) {
        reservationDate.checkInput();
        guest.checkInput();
        return viewDAO.showBillAndReview(utilDAO, roomId, reservationDate, guest);
    }

    @PostMapping("/reservations")
    public ResponseEntity<HttpStatus> reserve(@RequestParam Long roomId, @RequestParam Long userId, @Valid ReservationDate reservationDate, @Valid Guest guest) {
        reservationDate.checkInput();
        guest.checkInput();
        reservationDAO.reserve(utilDAO, roomId, userId, reservationDate, guest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
