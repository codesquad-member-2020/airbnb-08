package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.Guest;
import com.codesquad.airbnb.domain.dto.ReservationDate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class ReservationDAO {

    private final JdbcTemplate jdbcTemplate;

    public ReservationDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void reserve(UtilDAO utilDAO, Long roomId, Long userId, ReservationDate reservationDate, Guest guest) {
        if(!utilDAO.canReserve(roomId, reservationDate.getCheckInDate(), reservationDate.getCheckOutDate())) {
            throw new IllegalArgumentException("Already reserved room, Please reserve another room!");
        }

        insertReservationOfNewUser(roomId, userId);
        insertReservationDate(roomId, userId, reservationDate);
        insertGuests(roomId, userId, guest);
    }

    private void insertReservationOfNewUser(Long roomId, Long userId) {
        if (!isReservedUser(roomId, userId)) {
            String sql = "INSERT INTO reservations (room_id, user_id) VALUES (?,?)";

            this.jdbcTemplate.update(sql, roomId, userId);
        }
    }

    private Boolean isReservedUser(Long roomId, Long userId) {
        String sql = "SELECT IF(count(*) > 0, true, false) AS exist FROM reservations r WHERE r.room_id = ? AND user_id = ?";

        RowMapper<Boolean> rowMapper = new RowMapper<Boolean>() {
            @Override
            public Boolean mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getBoolean("exist");
            }
        };

        return this.jdbcTemplate.queryForObject(sql, new Object[]{roomId, userId}, rowMapper);
    }

    private void insertGuests(Long roomId, Long userId, Guest guest) {
        String sql = "INSERT INTO guests (room_id, user_id, number_of_adults, number_of_kids, number_of_babies) VALUES (?,?,?,?,?)";
        this.jdbcTemplate.update(sql, roomId, userId, guest.getNumberOfAdults(), guest.getNumberOfKids(), guest.getNumberOfBabies());
    }

    private void insertReservationDate(Long roomId, Long userId, ReservationDate reservationDate) {
        String sql = "INSERT INTO dates (room_id, user_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)";
        this.jdbcTemplate.update(sql, roomId, userId, reservationDate.getCheckInDate(), reservationDate.getCheckOutDate());
    }
}

