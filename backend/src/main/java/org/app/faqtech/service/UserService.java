package org.app.faqtech.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.entity.Role;
import org.app.faqtech.entity.User;
import org.app.faqtech.exception.UnauthorizedActionException;
import org.app.faqtech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByActiveFlag(boolean flag) {
        return flag ? userRepository.findByActiveTrue() : userRepository.findByActiveFalse();
    }


    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }


    public Long createUser(User userDetails) {
        User newUser = userRepository.saveAndFlush(userDetails);
        return newUser.getId();
    }

    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setEmail(userDetails.getEmail());
                    user.setFirstname(userDetails.getFirstname());
                    user.setLastname(userDetails.getLastname());
                    user.setSimplePushKey(user.getSimplePushKey());

                    return user;
                })
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Transactional
    public void softDeleteUser(Long id) {
        User foundUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if ( foundUser.getRole().equals(Role.ADMIN) ) {
            throw new UnauthorizedActionException("Can't delete an admin user");
        }

        userRepository.softDelete(foundUser.getId());
    }
}
