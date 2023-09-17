package org.app.faqtech.dto.auth;

public record LoginRequest(
        String username,
        String password
) {}
