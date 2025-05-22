package org.app.faqtech.dto.auth;

public record UserUpdateRequest(
        String currentPassword,  // The current password for verification
        String newPassword,      // Optional: Only set if the password is being changed
        String newUsername,      // Optional: Only set if the username is being changed
        String newEmail,          // Optional: Only set if the email is being changed
        String newFirstname,
        String newLastname,
        String newSimplePushKey
) {}
