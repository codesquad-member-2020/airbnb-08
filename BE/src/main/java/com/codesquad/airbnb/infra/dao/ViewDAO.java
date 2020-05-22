package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Repository
@Slf4j
public class ViewDAO {

    private final JdbcTemplate jdbcTemplate;

    public ViewDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Main main(ReservationDate reservationDate, Guest guest, Budget budget) {
        LocalDate checkInDate = reservationDate == null ? LocalDate.MIN : reservationDate.getCheckInDate();
        LocalDate checkOutDate = reservationDate == null ? LocalDate.MAX : reservationDate.getCheckInDate();

        int lowestPrice = budget == null ? 0 : budget.getLowestPrice();
        int highestPrice = budget == null ? Integer.MAX_VALUE : budget.getHighestPrice();

        String sql = "SELECT r.room_id AS id, " +
                "r.room_name AS name, " +
                "r.room_picture_url AS url, " +
                "IF(r.host_is_superhost = 't', '슈퍼호스트', '') AS host, " +
                "l.country AS country, " +
                "p.price AS price, " +
                "r2.number_of_reviews as number, " +
                "r2.review_scores_rating AS rating " +
                "FROM rooms r " +
                "INNER JOIN locations l on r.room_id = l.room_id " +
                "INNER JOIN prices p on r.room_id = p.room_id " +
                "INNER JOIN reviews r2 on r.room_id = r2.room_id " +
                "LEFT OUTER JOIN reservations r3 on r.room_id = r3.room_id " +
                "LEFT OUTER JOIN dates d on r3.room_id = d.room_id " +
                "WHERE (p.price BETWEEN ? AND ?) " +
                "GROUP BY r.room_id";

        RowMapper<RoomDTO> roomRowMapper = new RowMapper<RoomDTO>() {
            @Override
            public RoomDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                int originPrice = rs.getInt("price");
                int salesPrice = rs.getString("host").equals("슈퍼호스트") ? (int) (originPrice * 0.9) : originPrice;
                int totalPrice = reservationDate == null ? salesPrice : (int) (ChronoUnit.DAYS.between(checkOutDate, checkInDate) * salesPrice);

                Price price = new Price(originPrice, salesPrice, totalPrice);

                List<String> medias = new ArrayList<>();
                medias.add(rs.getString("url"));

                boolean canReserve = canReserve(rs.getLong("id"), checkInDate, checkOutDate);

                return new RoomDTO(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("country"),
                        rs.getDouble("rating"),
                        price,
                        medias,
                        rs.getString("host"),
                        canReserve
                );
            }
        };

        List<RoomDTO> rooms = this.jdbcTemplate.query(sql, new Object[]{lowestPrice, highestPrice}, roomRowMapper);

        return new Main(reservationDate, guest, budget, rooms.size(), rooms);
    }

    private Boolean canReserve(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {

        String sql = "SELECT count(*) AS count FROM rooms r LEFT OUTER JOIN dates d on r.room_id = d.room_id WHERE ((? BETWEEN d.check_in_date AND d.check_out_date ) OR (? BETWEEN d.check_in_date AND d.check_out_date )) AND r.room_id = ? GROUP BY r.room_id";

        ResultSetExtractor<Boolean> resultSetExtractor = new ResultSetExtractor<Boolean>() {
            @Override
            public Boolean extractData(ResultSet rs) throws SQLException, DataAccessException {
                return rs.next();
            }
        };

        return this.jdbcTemplate.query(sql, new Object[]{checkInDate, checkOutDate, roomId}, resultSetExtractor);
    }
}
