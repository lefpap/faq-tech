package org.app.faqtech.dto.auth;

public record RegisterRequest(
        String firstname,
        String lastname,
        String username,
        String password,
        String email,
        String simplePushKey
) {
}

