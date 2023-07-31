package org.app.faqtech.question;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.app.faqtech.user.User;

import java.time.LocalDate;

@Data
@Entity(name = "question")
public class Question {
    @Id
    private Long id;
    private String title;
    private String text;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
