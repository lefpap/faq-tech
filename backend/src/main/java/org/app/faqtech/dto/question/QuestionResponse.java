package org.app.faqtech.dto.question;

import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.entity.Question;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public record QuestionResponse(
        Long id,
        String title,
        String text,
        Instant createdAt,
        Integer answersCount,
        UserResponse user
) {

    public static QuestionResponse fromEntity(Question question) {
        return new QuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getCreatedAt(),
                question.getAnswers().size(),
                UserResponse.fromUser(question.getUser())
        );
    }

    public static List<QuestionResponse> fromEntities(List<Question> questions) {
        return questions.stream()
                .map(QuestionResponse::fromEntity)
                .toList();
    }
}
