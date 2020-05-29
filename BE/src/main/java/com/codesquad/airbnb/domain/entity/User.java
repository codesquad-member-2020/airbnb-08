package com.codesquad.airbnb.domain.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    Long userId;

    String nickName;

    String pictureUrl;
}
