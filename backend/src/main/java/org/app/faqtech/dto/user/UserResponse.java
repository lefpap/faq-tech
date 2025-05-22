package org.app.faqtech.dto.user;

import org.app.faqtech.entity.Role;
import org.app.faqtech.entity.User;

import java.util.List;

public record UserResponse(
        Long id,
        String firstname,
        String lastname,
        String username,
        String email,
        String simplePushKey,
        boolean active,
        Role role
) {

    public static UserResponse fromUser(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                user.getEmail(),
                user.getSimplePushKey(),
                user.isActive(),
                user.getRole()
        );
    }

    public static List<UserResponse> fromUsers(List<User> users) {
        return users.stream()
                .map(UserResponse::fromUser)
                .toList();
    }
}
