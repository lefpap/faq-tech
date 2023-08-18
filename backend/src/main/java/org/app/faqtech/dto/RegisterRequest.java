package org.app.faqtech.dto;

public record RegisterRequest(
        String firstname,
        String lastname,
        String username,
        String password,
        String email,
        String simplePushKey
) {
}

