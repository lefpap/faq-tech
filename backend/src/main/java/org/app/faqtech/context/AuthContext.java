package org.app.faqtech.context;

import lombok.RequiredArgsConstructor;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthContext {

    private final UserRepository userRepository;

    public Authentication getAuth() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getLoggedInUser() {
        String username = getAuth().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Authenticated user not found"));
    }
}
