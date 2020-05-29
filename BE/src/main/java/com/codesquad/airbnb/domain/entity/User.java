package com.codesquad.airbnb.domain.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    Long id;

    String userId;

    String pictureUrl;
}
