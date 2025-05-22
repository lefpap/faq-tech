package org.app.faqtech.dto.question;

import org.app.faqtech.dto.answer.AnswerResponse;
import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.entity.Question;

import java.time.Instant;
import java.util.List;

public record QuestionWithAnswersResponse(
        Long id,
        String title,
        String text,
        Instant createdAt,
        List<AnswerResponse> answers,
        UserResponse user
) {

    public static QuestionWithAnswersResponse fromEntity(Question question) {
        return new QuestionWithAnswersResponse(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getCreatedAt(),
                AnswerResponse.fromEntities(question.getAnswers()),
                UserResponse.fromUser(question.getUser())
        );
    }

    public static List<QuestionWithAnswersResponse> fromEntities(List<Question> questions) {
        return questions.stream()
                .map(QuestionWithAnswersResponse::fromEntity)
                .toList();
    }
}
