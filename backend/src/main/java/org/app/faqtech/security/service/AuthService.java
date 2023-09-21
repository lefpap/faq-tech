package org.app.faqtech.security.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.app.faqtech.dto.auth.AuthResponse;
import org.app.faqtech.dto.auth.ChangeCredentialsRequest;
import org.app.faqtech.dto.auth.LoginRequest;
import org.app.faqtech.dto.auth.RegisterRequest;
import org.app.faqtech.entity.Role;
import org.app.faqtech.entity.User;
import org.app.faqtech.exception.ConflictException;
import org.app.faqtech.exception.UnauthorizedActionException;
import org.app.faqtech.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
                .active(true)
                .build();

        userRepository.save(user);
        
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());
        extraClaims.put("role", user.getRole());
        String token = jwtService.generateToken(user.getUserDetails(), extraClaims);
        return new AuthResponse(token);
    }

    public AuthResponse changeCredentials(ChangeCredentialsRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new EntityNotFoundException("Authenticated user not found"));

        // Verify the current password
        if (!passwordEncoder.matches(request.currentPassword(), currentUser.getPassword())) {
            throw new UnauthorizedActionException("Current password is incorrect.");
        }

        // Update password if provided
        if (request.newPassword() != null && !request.newPassword().isEmpty()) {
            currentUser.setPassword(passwordEncoder.encode(request.newPassword()));
        }

        // Update username if provided and ensure it's unique
        if (request.newUsername() != null && !request.newUsername().isEmpty()) {
            boolean existsByUsername = userRepository.existsByUsername(request.newUsername());
            if (existsByUsername) {
                throw new ConflictException("Username already exists.");
            }
            currentUser.setUsername(request.newUsername());
        }

        // Update email if provided and ensure it's unique
        if (request.newEmail() != null && !request.newEmail().isEmpty()) {
            boolean existsByEmail = userRepository.existsByEmail(request.newEmail());
            if (existsByEmail) {
                throw new ConflictException("Email already exists.");
            }
            currentUser.setEmail(request.newEmail());
        }

        userRepository.save(currentUser);

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", currentUser.getId());
        extraClaims.put("role", currentUser.getRole());
        String token = jwtService.generateToken(currentUser.getUserDetails(), extraClaims);
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

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", foundUser.getId());
        extraClaims.put("role", foundUser.getRole());
        String token = jwtService.generateToken(foundUser.getUserDetails(), extraClaims);
        return new AuthResponse(token);
    }
}
