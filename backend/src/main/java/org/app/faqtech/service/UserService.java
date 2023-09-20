package org.app.faqtech.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.context.AuthContext;
import org.app.faqtech.dto.user.UserUpdateRequest;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthContext authContext;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getLoggedInUser() {
        return authContext.getLoggedInUser();
    }

    public void updateLoggedInUser(UserUpdateRequest userRequest) {
        // Get updated user
        User user = userRequest.updateUser(authContext.getLoggedInUser());
        // Save to db
        userRepository.save(user);
    }

    @Transactional
    public void softDeleteLoggedInUser() {
        // Empty user details
        User emptyUser = UserUpdateRequest.emptyUser(authContext.getLoggedInUser());
        // Save to db
        userRepository.save(emptyUser);
    }
}
