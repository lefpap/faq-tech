package org.app.faqtech.dto.answer;

import org.app.faqtech.dto.user.UserResponse;
import org.app.faqtech.entity.Answer;

import java.time.Instant;
import java.util.List;

public record AnswerResponse(
        Long id,
        String text,
        Instant createdAt,
        UserResponse user
) {

    public static AnswerResponse fromEntity(Answer answer) {
        return new AnswerResponse(
                answer.getId(),
                answer.getText(),
                answer.getCreatedAt(),
                UserResponse.fromUser(answer.getUser())
        );
    }

    public static List<AnswerResponse> fromEntities(List<Answer> answers) {
        return answers.stream()
                .map(AnswerResponse::fromEntity)
                .toList();
    }

    public Answer toEntity() {
        Answer answer = new Answer();
        answer.setId(id());
        answer.setText(text());
        answer.setCreatedAt(createdAt());

        return answer;
    }
}
