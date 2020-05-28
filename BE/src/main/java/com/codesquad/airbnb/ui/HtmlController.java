package com.codesquad.airbnb.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HtmlController {

    @GetMapping("/")
    public String loginForm() {
        return "/login";
    }
}
