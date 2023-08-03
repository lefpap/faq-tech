package org.app.faqtech.question;

import jakarta.persistence.*;
import lombok.Data;
import org.app.faqtech.user.User;

import java.time.LocalDate;

@Data
@Entity(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String text;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
