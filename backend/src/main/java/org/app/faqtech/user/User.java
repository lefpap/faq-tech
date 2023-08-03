package org.app.faqtech.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
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

    @Enumerated(EnumType.STRING)
    private Role role;
}
