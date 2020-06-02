package com.codesquad.airbnb.user.ui;

import com.codesquad.airbnb.user.domain.GitHubOAuthProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class OAuthTestController {

    private final GitHubOAuthProperty gitHubOAuthProperty;

    @GetMapping("/")
    public String loginPage(Model model) {
        model.addAttribute("clientId", gitHubOAuthProperty.getClientId());
        return "/login";
    }
}
