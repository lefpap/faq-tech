package org.app.faqtech.controller;

import lombok.AllArgsConstructor;
import org.app.faqtech.dto.user.GetUserResponse;
import org.app.faqtech.dto.user.UpdateUserRequest;
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
    public List<GetUserResponse> getUsers() {
        return GetUserResponse.fromUsers(userService.getUsers());
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public GetUserResponse getUser() {
        return GetUserResponse.fromUser(userService.getLoggedInUser());
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public void updateLoggedInUser(@RequestBody UpdateUserRequest userRequest) {
        userService.updateLoggedInUser(userRequest);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void softDeleteLoggedInUser() {
        userService.softDeleteLoggedInUser();
    }
}
