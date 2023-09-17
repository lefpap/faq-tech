package org.app.faqtech.security.config;

import org.app.faqtech.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class AuthConfigTest {

    @InjectMocks
    private AuthConfig authConfig;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testPasswordEncoder() {
        PasswordEncoder encoder = authConfig.passwordEncoder();
        String rawPassword = "pass123";
        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("raw-pass: " + rawPassword);
        System.out.println("enc-pass: " + encodedPassword);
        assertTrue(encoder.matches(rawPassword, encodedPassword), "Encoded password should match raw password");
    }
}