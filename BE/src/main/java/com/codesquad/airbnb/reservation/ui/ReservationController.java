package com.codesquad.airbnb.reservation.ui;

import com.codesquad.airbnb.reservation.application.ReservationService;
import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.room.domain.Confirmation;
import com.codesquad.airbnb.manager.ManagerDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.codesquad.airbnb.common.utils.JwtUtils.decrypt;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class ReservationController {

    private final ManagerDAO managerDAO;

    private final ReservationService reservationService;

    @GetMapping("/reservations")
    public Confirmation showBillAndReview(@RequestParam Long roomId, @Valid ReservationDate reservationDate) {
        return managerDAO.showBillAndReview(roomId, reservationDate);
    }

    @PostMapping("/reservations")
    public ResponseEntity<HttpStatus> reserve(@RequestParam Long roomId,
                                              @Valid ReservationDate reservationDate,
                                              @Valid Guest guest,
                                              @CookieValue(value = "jwt") String jwtToken) {

        Long id = (Long) decrypt(jwtToken).get("id");
        reservationService.reserve(roomId, id, reservationDate, guest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
