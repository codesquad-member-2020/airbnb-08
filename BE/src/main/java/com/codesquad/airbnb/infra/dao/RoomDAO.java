package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.RoomDTO;
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

    public List<RoomDTO> findAll() {

        String sql = "SELECT r.room_id, " +
                "room_name, " +
                "room_description, " +
                "room_picture_url, " +
                "host_is_superhost " +
                "FROM rooms r";

        RowMapper<RoomDTO> mainDTORowMapper = new RowMapper<RoomDTO>() {
            @Override
            public RoomDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                return null;
            }
        };

        return this.jdbcTemplate.query(sql, mainDTORowMapper);
    }
}
