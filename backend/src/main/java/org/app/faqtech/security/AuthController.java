package org.app.faqtech.security;

import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.auth.AuthResponse;
import org.app.faqtech.dto.auth.ChangeCredentialsRequest;
import org.app.faqtech.dto.auth.LoginRequest;
import org.app.faqtech.dto.auth.RegisterRequest;
import org.app.faqtech.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
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

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public AuthResponse changeCredentials(@RequestBody ChangeCredentialsRequest request) {
        return authService.changeCredentials(request);
    }
}
