package com.codesquad.airbnb.user.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    private Long userId;

    private String nickName;

    private String pictureUrl;
}
