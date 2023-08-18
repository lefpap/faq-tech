package org.app.faqtech.security;

import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.AuthResponse;
import org.app.faqtech.dto.LoginRequest;
import org.app.faqtech.dto.RegisterRequest;
import org.app.faqtech.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {
        return authService.authenticate(request);
    }
}
