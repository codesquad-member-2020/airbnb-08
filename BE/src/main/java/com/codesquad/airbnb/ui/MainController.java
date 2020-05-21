package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.domain.dto.Budget;
import com.codesquad.airbnb.domain.dto.Guest;
import com.codesquad.airbnb.domain.dto.Main;
import com.codesquad.airbnb.domain.dto.ReservationDate;
import com.codesquad.airbnb.infra.dao.ViewDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final ViewDAO viewDAO;

    @GetMapping("")
    public Main showMain(@RequestParam(required = false) ReservationDate reservationDate,
                         @RequestParam(required = false) Guest guest,
                         @RequestParam(required = false) Budget budget) {
        return viewDAO.main(reservationDate, guest, budget);
    }
}
