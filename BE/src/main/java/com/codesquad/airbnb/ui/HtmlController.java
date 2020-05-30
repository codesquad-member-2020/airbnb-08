package com.codesquad.airbnb.ui;

import com.codesquad.airbnb.domain.dto.GitHubOAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class HtmlController {

    private final GitHubOAuth gitHubOAuth;

    @GetMapping("/")
    public String loginPage(Model model) {
        model.addAttribute("clientId", gitHubOAuth.getClientId());
        return "/login";
    }
}
