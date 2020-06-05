package com.codesquad.airbnb.reservation.ui;

import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.reservation.infra.ReservationDAO;
import com.codesquad.airbnb.room.domain.Confirmation;
import com.codesquad.airbnb.manager.ManagerDAO;
import com.codesquad.airbnb.room.infra.RoomDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class ReservationController {

    private final ManagerDAO managerDAO;

    private final ReservationDAO reservationDAO;

    @GetMapping("/reservations")
    public Confirmation showBillAndReview(@RequestParam Long roomId, @Valid ReservationDate reservationDate) {
        return managerDAO.showBillAndReview(roomId, reservationDate);
    }

    @PostMapping("/reservations")
    public ResponseEntity<HttpStatus> reserve(@RequestParam Long roomId,
                                              @Valid ReservationDate reservationDate,
                                              @Valid Guest guest,
                                              HttpServletRequest request) {

        Long id = (Long) request.getAttribute("id");
        boolean canReserve = managerDAO.canReserve(roomId, reservationDate);
        reservationDAO.reserve(canReserve, roomId, id, reservationDate, guest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
