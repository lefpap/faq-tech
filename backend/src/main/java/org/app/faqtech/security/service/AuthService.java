package org.app.faqtech.security.service;

import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.AuthResponse;
import org.app.faqtech.dto.LoginRequest;
import org.app.faqtech.dto.RegisterRequest;
import org.app.faqtech.entity.Role;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.UserRepository;
import org.app.faqtech.security.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .simplePushKey(request.simplePushKey())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getUserDetails());
        return new AuthResponse(token);
    }

    public AuthResponse authenticate(LoginRequest request) {
        var authToken = new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        );

        authManager.authenticate(authToken);

        var foundUser = userRepository
                .findByUsername(request.username())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(foundUser.getUserDetails());
        return new AuthResponse(token);
    }
}
