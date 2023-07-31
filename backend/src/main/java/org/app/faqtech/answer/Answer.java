package org.app.faqtech.answer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.app.faqtech.question.Question;
import org.app.faqtech.user.User;

import java.time.LocalDate;

@Data
@Entity(name = "answer")
public class Answer {
    @Id
    private Long id;
    private String text;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
