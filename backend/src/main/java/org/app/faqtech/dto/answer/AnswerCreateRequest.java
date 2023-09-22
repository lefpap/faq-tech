package org.app.faqtech.dto.answer;

import org.app.faqtech.entity.Answer;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;

public record AnswerCreateRequest(
        String text,
        Long userId,
        Long questionId
) {

    public Answer toEntity(User user, Question question) {
        Answer answer = new Answer();
        answer.setText(text());
        answer.setUser(user);
        answer.setQuestion(question);

        return answer;
    }
}
