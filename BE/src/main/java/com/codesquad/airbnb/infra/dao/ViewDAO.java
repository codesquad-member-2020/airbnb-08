package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.Main;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ViewDAO {

    private final JdbcTemplate jdbcTemplate;

    public ViewDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Main> main() {

        String sql = ""; +


        RowMapper<Main> mainDTORowMapper = new RowMapper<Main>() {
            @Override
            public Main mapRow(ResultSet rs, int rowNum) throws SQLException {
                return null;
            }
        };

        return this.jdbcTemplate.query(sql, mainDTORowMapper);
    }
}
