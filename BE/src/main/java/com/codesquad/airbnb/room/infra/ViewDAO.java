package com.codesquad.airbnb.room.infra;

import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.room.domain.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;

@Repository
@Slf4j
public class ViewDAO {

    private final JdbcTemplate jdbcTemplate;

    public ViewDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Main main(UtilDAO utilDAO, ReservationDate reservationDate, Guest guest, Budget budget) {
        LocalDate checkInDate = reservationDate.getCheckInDate();
        LocalDate checkOutDate = reservationDate.getCheckOutDate();

        int lowestPrice = budget.getLowestPrice();
        int highestPrice = budget.getHighestPrice();

        String sql = "SELECT r.room_id AS id, " +
                "r.room_name AS name, " +
                "r.room_picture_url AS url, " +
                "IF(r.host_is_superhost = 't', '슈퍼호스트', '') AS host, " +
                "l.country AS country, " +
                "p.price AS price, " +
                "r2.review_scores_rating AS rating " +
                "FROM rooms r " +
                "INNER JOIN locations l on r.room_id = l.room_id " +
                "INNER JOIN prices p on r.room_id = p.room_id " +
                "INNER JOIN reviews r2 on r.room_id = r2.room_id " +
                "LEFT OUTER JOIN reservations r3 on r.room_id = r3.room_id " +
                "LEFT OUTER JOIN dates d on r3.room_id = d.room_id " +
                "WHERE (p.price BETWEEN ? AND ?) " +
                "GROUP BY r.room_id";

        RowMapper<RoomDetail> roomRowMapper = new RowMapper<RoomDetail>() {
            @Override
            public RoomDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
                int originPrice = rs.getInt("price");

                int salesPrice = rs.getString("host").equals("슈퍼호스트") ? (int) (originPrice * 0.9) : originPrice;

                int length = (int) (ChronoUnit.DAYS.between(checkInDate, checkOutDate));
                int totalPrice = checkInDate.equals(LocalDate.MIN) ? salesPrice : (length + 1) * salesPrice;

                Price price = new Price(originPrice, salesPrice, totalPrice);

                List<String> medias = new ArrayList<>();
                medias.add(rs.getString("url"));

                return new RoomDetail(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("country"),
                        rs.getDouble("rating"),
                        price,
                        medias,
                        rs.getString("host"),
                        utilDAO.canReserve(rs.getLong("id"), checkInDate, checkOutDate)
                );
            }
        };

        List<RoomDetail> rooms = this.jdbcTemplate.query(sql, new Object[]{lowestPrice, highestPrice}, roomRowMapper);

        return new Main(reservationDate, guest, budget, rooms.size(), rooms);
    }

    public Statistics showStatistics(ReservationDate reservationDate) {

        int lowestPrice = 0;
        int highestPrice = 0;
        int averagePrice = 0;

        String sql = "SELECT p.price FROM rooms r INNER JOIN prices p ON r.room_id = p.room_id LEFT OUTER JOIN dates d on r.room_id = d.room_id WHERE ((? NOT BETWEEN d.check_in_date AND d.check_out_date) AND (? NOT BETWEEN d.check_in_date AND d.check_out_date)) OR d.check_in_date IS NULL GROUP BY r.room_id ORDER BY price ASC";

        RowMapper<Integer> rowMapper = new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
                int price = rs.getInt("price");
                return rs.wasNull() ? 0 : price;
            }
        };

        List<Integer> prices = this.jdbcTemplate.query(sql, new Object[]{reservationDate.getCheckInDate(), reservationDate.getCheckOutDate()}, rowMapper);

        if (!prices.isEmpty()) {
            lowestPrice = prices.get(0);
            highestPrice = prices.get(prices.size() - 1);
            averagePrice = calculateAverage(prices);
        }

        int endPrice = 1000000;
        int divide = 20000;
        int[] counts = new int[endPrice/divide];

        for (int price : prices) {
            if(price >= endPrice) {
                counts[(endPrice/divide)-1]++;
                continue;
            }
            counts[price/divide] ++;
        }

        return new Statistics(lowestPrice, highestPrice, averagePrice, prices, counts);
    }

    private Integer calculateAverage(List<Integer> prices) {
        OptionalDouble average = prices.stream().mapToDouble(a -> a).average();
        return average.isPresent() ? (int) average.getAsDouble() : 0;
    }

    public Confirmation showBillAndReview(UtilDAO utilDAO, Long roomId, ReservationDate reservationDate, Guest guest) {

        if(!utilDAO.canReserve(roomId, reservationDate.getCheckInDate(), reservationDate.getCheckOutDate())) {
            throw new IllegalArgumentException("Already reserved room, Please reserve another room!");
        }

        String sql = "SELECT r.room_id AS id, IF(r.host_is_superhost = 't', p.price * 0.9, p.price) AS price, p.cleaning_fee, p.security_deposit, r2.number_of_reviews, r2.review_scores_rating AS rating FROM rooms r INNER JOIN prices p on r.room_id = p.room_id INNER JOIN reviews r2 on r.room_id = r2.room_id WHERE r.room_id = ? GROUP BY r.room_id;";

        RowMapper<Confirmation> reservationRowMapper = new RowMapper<Confirmation>() {
            @Override
            public Confirmation mapRow(ResultSet rs, int rowNum) throws SQLException {
                int salesPrice = rs.getInt("price");
                int length = (int) (ChronoUnit.DAYS.between(reservationDate.getCheckInDate(), reservationDate.getCheckOutDate()));
                int cleaningFee = rs.getInt("cleaning_fee");
                int deposit = rs.getInt("security_deposit");
                int priceWithFee = (salesPrice * length) + cleaningFee + deposit;

                Bill bill = new Bill(
                        salesPrice,
                        length + 1,
                        salesPrice * length,
                        cleaningFee,
                        deposit,
                        priceWithFee
                );
                Review review = new Review(rs.getInt("number_of_reviews"), rs.getDouble("rating"));
                return new Confirmation(bill, review);
            }
        };

        return this.jdbcTemplate.queryForObject(sql, new Object[]{roomId}, reservationRowMapper);
    }
}
