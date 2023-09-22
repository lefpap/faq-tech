package org.app.faqtech.dto.question;

import org.app.faqtech.dto.answer.AnswerResponse;
import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.entity.Question;
import java.time.LocalDateTime;
import java.util.List;

public record QuestionResponse(
        Long id,
        String title,
        String text,
        LocalDateTime createdAt,
        List<AnswerResponse> answers,
        UserResponse user
) {

    public static QuestionResponse fromEntity(Question question) {
        return new QuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getCreatedAt(),
                AnswerResponse.fromEntities(question.getAnswers()),
                UserResponse.fromUser(question.getUser())
        );
    }

    public static List<QuestionResponse> fromEntities(List<Question> questions) {
        return questions.stream()
                .map(QuestionResponse::fromEntity)
                .toList();
    }
}
