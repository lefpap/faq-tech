package org.app.faqtech.user;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

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

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean active = true;

    @Enumerated(EnumType.STRING)
    private Role role;
}
