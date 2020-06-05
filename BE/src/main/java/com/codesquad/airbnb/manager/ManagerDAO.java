package com.codesquad.airbnb.manager;

import com.codesquad.airbnb.reservation.domain.Guest;
import com.codesquad.airbnb.reservation.domain.ReservationDate;
import com.codesquad.airbnb.room.domain.Bill;
import com.codesquad.airbnb.room.domain.Confirmation;
import com.codesquad.airbnb.room.domain.Review;
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

@Repository
public class ManagerDAO {

    private final JdbcTemplate jdbcTemplate;

    public ManagerDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Boolean canReserve(Long roomId, ReservationDate reservationDate) {
        LocalDate checkInDate = reservationDate.getCheckInDate();
        LocalDate checkOutDate = reservationDate.getCheckOutDate();

        String sql = "SELECT count(*) AS count FROM rooms r INNER JOIN dates d on r.room_id = d.room_id WHERE ((? BETWEEN d.check_in_date AND d.check_out_date ) OR (? BETWEEN d.check_in_date AND d.check_out_date ) OR (? < d.check_in_date AND ? > d.check_out_date)) AND r.room_id = ? GROUP BY r.room_id";

        ResultSetExtractor<Boolean> resultSetExtractor = new ResultSetExtractor<Boolean>() {
            @Override
            public Boolean extractData(ResultSet rs) throws SQLException, DataAccessException {
                return !rs.next();
            }
        };

        return this.jdbcTemplate.query(sql, new Object[]{checkInDate, checkOutDate, checkInDate, checkOutDate, roomId}, resultSetExtractor);
    }

    public Confirmation showBillAndReview(Long roomId, ReservationDate reservationDate) {

        if(!canReserve(roomId, reservationDate)) {
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
