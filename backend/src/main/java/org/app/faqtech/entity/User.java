package org.app.faqtech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String password;
    private String email;
    private String simplePushKey;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean active = true;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UserDetails getUserDetails() {
        return new AppUserDetails(this);
    }

    public boolean hasRole(Role... roles) {
        return Arrays.stream(roles)
                .anyMatch(r -> r.equals(role));
    }
}
