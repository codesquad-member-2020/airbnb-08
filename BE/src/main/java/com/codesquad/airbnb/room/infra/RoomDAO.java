package com.codesquad.airbnb.room.infra;

import com.codesquad.airbnb.room.domain.RoomDetail;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RoomDAO {

    private final JdbcTemplate jdbcTemplate;

    public RoomDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<RoomDetail> findAll() {

        String sql = "SELECT r.room_id, " +
                "room_name, " +
                "room_description, " +
                "room_picture_url, " +
                "host_is_superhost " +
                "FROM rooms r";

        RowMapper<RoomDetail> mainDTORowMapper = new RowMapper<RoomDetail>() {
            @Override
            public RoomDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
                return null;
            }
        };

        return this.jdbcTemplate.query(sql, mainDTORowMapper);
    }
}
