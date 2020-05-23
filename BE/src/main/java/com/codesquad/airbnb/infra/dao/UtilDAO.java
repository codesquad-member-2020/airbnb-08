package com.codesquad.airbnb.infra.dao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

@Repository
public class UtilDAO {

    private final JdbcTemplate jdbcTemplate;

    public UtilDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Boolean canReserve(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {

        String sql = "SELECT count(*) AS count FROM rooms r INNER JOIN dates d on r.room_id = d.room_id WHERE ((? BETWEEN d.check_in_date AND d.check_out_date ) OR (? BETWEEN d.check_in_date AND d.check_out_date )) AND r.room_id = ? GROUP BY r.room_id";

        ResultSetExtractor<Boolean> resultSetExtractor = new ResultSetExtractor<Boolean>() {
            @Override
            public Boolean extractData(ResultSet rs) throws SQLException, DataAccessException {
                return !rs.next();
            }
        };

        return this.jdbcTemplate.query(sql, new Object[]{checkInDate, checkOutDate, roomId}, resultSetExtractor);
    }
}
