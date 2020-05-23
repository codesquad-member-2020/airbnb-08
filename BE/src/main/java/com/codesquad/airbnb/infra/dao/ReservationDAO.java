package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.Guest;
import com.codesquad.airbnb.domain.dto.ReservationDate;
import com.codesquad.airbnb.domain.entity.Reservation;
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

    private Boolean isReservedUser(Long roomId, Long userId) {
        String sql = "SELECT IF(count(*), true, false) AS exist FROM reservations r WHERE r.room_id = ? AND user_id = ?";

        RowMapper<Boolean> rowMapper = new RowMapper<Boolean>() {
            @Override
            public Boolean mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getBoolean("exist");
            }
        };

        return this.jdbcTemplate.queryForObject(sql, new Object[]{roomId, userId}, rowMapper);
    }


}

