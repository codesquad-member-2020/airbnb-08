package com.codesquad.airbnb.reservation.application;

import com.codesquad.airbnb.manager.ManagerDAO;
import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.reservation.infra.ReservationDAO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ReservationService {

    private final ReservationDAO reservationDAO;

    private final ManagerDAO managerDAO;

    @Transactional
    public void reserve(Long roomId, Long id, ReservationDate reservationDate, Guest guest) {
        boolean canReserve = managerDAO.canReserve(roomId, reservationDate);
        reservationDAO.reserve(canReserve, roomId, id, reservationDate, guest);
    }
}
