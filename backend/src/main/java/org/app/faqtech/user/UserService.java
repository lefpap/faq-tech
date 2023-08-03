package org.app.faqtech.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
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

    public void deleteUser(Long id) {
        User foundUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if ( foundUser.getRole().equals(Role.ADMIN) ) {
            throw new UnauthorizedActionException("Can't delete an admin user");
        }

        userRepository.delete(foundUser);
    }
}
