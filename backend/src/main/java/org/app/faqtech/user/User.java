package org.app.faqtech.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "auth_user")
public class User {
    @Id
    private Long id;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private String simplePushKey;
}
