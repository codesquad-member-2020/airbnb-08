package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.Budget;
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

    public List<Main> main(Budget budget) {
        int lowestPrice = budget == null ? 0 : budget.getLowestPrice();
        int highestPrice = budget == null ? Integer.MAX_VALUE : budget.getHighestPrice();

        String sql = "SELECT r.room_id, " +
                "r.room_name, " +
                "r.room_picture_url, " +
                "IF(r.host_is_superhost = 't', '슈퍼호스트', ''), " +
                "l.country, p.price, " +
                "p.security_deposit, " +
                "p.cleaning_fee, " +
                "r2.number_of_reviews, " +
                "r2.review_scores_rating " +
                "FROM rooms r " +
                "INNER JOIN locations l on r.room_id = l.room_id " +
                "INNER JOIN prices p on r.room_id = p.room_id " +
                "INNER JOIN reviews r2 on r.room_id = r2.room_id " +
                "WHERE p.price BETWEEN ? AND ?;";

        RowMapper<Main> mainDTORowMapper = new RowMapper<Main>() {
            @Override
            public Main mapRow(ResultSet rs, int rowNum) throws SQLException {
                return null;
            }
        };

        return this.jdbcTemplate.query(sql, new Object[]{lowestPrice, highestPrice}, mainDTORowMapper);
    }
}
