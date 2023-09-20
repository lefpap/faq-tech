package org.app.faqtech.controller;

import lombok.AllArgsConstructor;
import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.dto.user.UserUpdateRequest;
import org.app.faqtech.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getUsers() {
        return UserResponse.fromUsers(userService.getUsers());
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse getUser() {
        return UserResponse.fromUser(userService.getLoggedInUser());
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public void updateLoggedInUser(@RequestBody UserUpdateRequest userRequest) {
        userService.updateLoggedInUser(userRequest);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void softDeleteLoggedInUser() {
        userService.softDeleteLoggedInUser();
    }
}
