package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ViewDAO {

    private final JdbcTemplate jdbcTemplate;

    public ViewDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Main main(ReservationDate reservationDate, Guest guest, Budget budget) {
        LocalDateTime checkInDate = reservationDate == null ? LocalDateTime.now().minusYears(10L) : reservationDate.getCheckInDate();
        LocalDateTime checkOutDate = reservationDate == null ? LocalDateTime.now().plusYears(10L) : reservationDate.getCheckInDate();

        int lowestPrice = budget == null ? 0 : budget.getLowestPrice();
        int highestPrice = budget == null ? Integer.MAX_VALUE : budget.getHighestPrice();

        String sql = "SELECT r.room_id AS id, " +
                "r.room_name AS name, " +
                "r.room_picture_url AS url, " +
                "IF(r.host_is_superhost = 't', '슈퍼호스트', '') AS host, " +
                "l.country AS country, " +
                "p.price AS price, " +
                "p.security_deposit AS deposit, " +
                "p.cleaning_fee AS fee, " +
                "r2.number_of_reviews as number, " +
                "r2.review_scores_rating AS rating, " +
                "IF((? NOT BETWEEN d.check_in_date AND d.check_out_date) AND " +
                "(? NOT BETWEEN d.check_in_date AND d.check_out_date), true, false) AS available " +
                "FROM rooms r " +
                "INNER JOIN locations l on r.room_id = l.room_id " +
                "INNER JOIN prices p on r.room_id = p.room_id " +
                "INNER JOIN reviews r2 on r.room_id = r2.room_id " +
                "LEFT OUTER JOIN reservations r3 on r.room_id = r3.room_id " +
                "LEFT OUTER JOIN dates d on r3.room_id = d.room_id " +
                "WHERE (p.price BETWEEN ? AND ?) " +
                "AND (? NOT BETWEEN d.check_in_date AND d.check_out_date) " +
                "AND (? NOT BETWEEN d.check_in_date AND d.check_out_date) " +
                "OR d.check_in_date IS NULL";

        RowMapper<RoomDTO> roomRowMapper = new RowMapper<RoomDTO>() {
            @Override
            public RoomDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                Price price = new Price(rs.getInt("price"),
                        rs.getInt("deposit"),
                        rs.getInt("fee"));

                List<String> medias = new ArrayList<>();
                medias.add(rs.getString("url"));

                return new RoomDTO(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("country"),
                        rs.getDouble("rating"),
                        price,
                        medias,
                        rs.getString("host"),
                        rs.getBoolean("available")
                );
            }
        };

        List<RoomDTO> rooms = this.jdbcTemplate.query(sql, new Object[]{lowestPrice, highestPrice}, roomRowMapper);

        return new Main(reservationDate, guest, budget, rooms.size(), rooms);
    }
}
