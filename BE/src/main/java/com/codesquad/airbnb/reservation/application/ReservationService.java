package com.codesquad.airbnb.reservation.application;

import com.codesquad.airbnb.manager.ManagerDAO;
import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import static com.codesquad.airbnb.common.utils.JwtUtils.decrypt;

@AllArgsConstructor
public class ReservationService {

    private final ManagerDAO managerDAO;

    @Transactional
    public void reserve(String jwtToken, Long roomId, ReservationDate reservationDate, Guest guest) {
        Long id = (Long) decrypt(jwtToken).get("id");
        boolean canReserve = managerDAO.canReserve(roomId, reservationDate);
        reservationDAO.reserve(canReserve, roomId, id, reservationDate, guest);
    }
}
