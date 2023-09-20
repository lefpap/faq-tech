package org.app.faqtech.dto.question;

import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;

import java.time.LocalDate;
import java.util.List;

public record QuestionResponse(
        Long id,
        String title,
        String text,
        LocalDate createdAt,
        UserResponse user
) {

    public static QuestionResponse fromQuestion(Question question) {
        return new QuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getCreatedAt(),
                UserResponse.fromUser(question.getUser())
        );
    }

    public static List<QuestionResponse> fromQuestions(List<Question> questions) {
        return questions.stream()
                .map(QuestionResponse::fromQuestion)
                .toList();
    }
}
