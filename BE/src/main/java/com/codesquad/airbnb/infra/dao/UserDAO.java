package com.codesquad.airbnb.infra.dao;

import com.codesquad.airbnb.domain.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    public UserDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void save(User user) {
        String sql = "INSERT INTO users (user_id, nickname, picture_url) VALUES (?, ?, ?)";
        this.jdbcTemplate.update(sql, user.getUserId(), user.getNickName(), user.getPictureUrl());
    }
}
