package org.app.faqtech.dto.question;

import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;

public record QuestionCreateRequest(
        String title,
        String text,
        Long userId
) {

    public Question toEntity(User user) {
        Question question = new Question();
        question.setTitle(title);
        question.setText(text);
        question.setUser(user);

        return question;
    }

}
