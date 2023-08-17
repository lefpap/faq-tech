package org.app.faqtech.controller;

import lombok.AllArgsConstructor;
import org.app.faqtech.entity.User;
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
    public List<User> getUsers(@RequestParam(required = false) Boolean active) {

        if ( active == null) {
            return userService.getUsers();
        }

        return userService.getUsersByActiveFlag(active);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createUser(@RequestBody User userDetails) {
        return userService.createUser(userDetails);
    }


    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deactivateUser(@PathVariable Long id) {
        userService.softDeleteUser(id);
    }
}
