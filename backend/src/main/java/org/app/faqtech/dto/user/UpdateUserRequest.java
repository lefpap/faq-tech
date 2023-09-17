package org.app.faqtech.dto.user;

import org.app.faqtech.entity.User;

import java.util.Optional;
import java.util.UUID;

public record UpdateUserRequest(
        String firstname,
        String lastname,
        String simplePushKey
) {
    public User updateUser(User user) {
        Optional.ofNullable(firstname).ifPresent(user::setFirstname);
        Optional.ofNullable(lastname).ifPresent(user::setLastname);
        Optional.ofNullable(simplePushKey).ifPresent(user::setSimplePushKey);

        return user;
    }

    public static User emptyUser(User user) {
        user.setEmail("NA");
        user.setUsername("deleted user" + user.getId());
        user.setPassword(UUID.randomUUID().toString());
        user.setFirstname("NA");
        user.setLastname("NA");
        user.setSimplePushKey("NA");
        user.setActive(false);

        return user;
    }
}
